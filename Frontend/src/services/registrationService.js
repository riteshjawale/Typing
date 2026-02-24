import { supabase } from './supabaseClient';

const REGISTRATION_TABLE = import.meta.env.VITE_SUPABASE_REGISTRATION_TABLE || 'registration_applications';
const REGISTRATION_BUCKET = import.meta.env.VITE_SUPABASE_REGISTRATION_BUCKET || 'registration-documents';

const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, '_');

const uploadFile = async (file, folder) => {
  if (!file) return null;

  const timestamp = Date.now();
  const safeName = sanitizeFileName(file.name);
  const filePath = `${folder}/${timestamp}_${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(REGISTRATION_BUCKET)
    .upload(filePath, file, { upsert: false });

  if (uploadError) {
    throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(REGISTRATION_BUCKET).getPublicUrl(filePath);

  return {
    bucket: REGISTRATION_BUCKET,
    path: filePath,
    publicUrl: data?.publicUrl || null,
    mimeType: file.type || null,
    size: file.size || null,
    originalName: file.name,
  };
};

export const submitRegistrationApplication = async (formData) => {
  const availability = Object.entries(formData.availability).map(([day, slot]) => ({
    day,
    enabled: slot.enabled,
    from: slot.from || null,
    to: slot.to || null,
  }));

  const selectedAvailability = availability.filter((slot) => slot.enabled);

  const documents = {
    photo: await uploadFile(formData.photo, 'photo'),
    aadhaar: await uploadFile(formData.aadhaar, 'aadhaar'),
    shopAct: await uploadFile(formData.shopAct, 'shop-act'),
    shopPhoto: await uploadFile(formData.shopPhoto, 'shop-photo'),
  };

  const payload = {
    role: formData.role,
    full_name: formData.fullName,
    email: formData.email,
    mobile: formData.mobile,
    address: formData.address,
    shop_address: formData.shopAddress || null,
    availability: selectedAvailability,
    resources: formData.resources,
    bank_name: formData.bankName,
    account_number: formData.accountNumber,
    ifsc_code: formData.ifscCode,
    services: formData.services,
    consent: formData.consent,
    documents,
    status: 'pending',
  };

  const { error } = await supabase
    .from(REGISTRATION_TABLE)
    .insert(payload);

  if (error) {
    throw new Error(error.message || 'Failed to save registration form.');
  }

  return { success: true };
};
