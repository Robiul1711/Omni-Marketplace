/**
 * Placement Service Helper Utilities
 * Helper functions to transform placement form state to FormData matching backend contract
 */

export const buildPlacementFormData = (values, isEdit = false) => {
  const formData = new FormData();

  // Basic Location & Top level fields
  if (values.location) formData.append("location", values.location);
  if (values.city) formData.append("city", values.city);
  if (values.state) formData.append("state", values.state);
  if (values.country) formData.append("country", values.country);
  if (values.zip_code) formData.append("zip_code", values.zip_code);
  if (values.status) formData.append("status", values.status);
  if (values.campaign_duration) formData.append("campaign_duration", values.campaign_duration);
  if (values.start_date) formData.append("start_date", values.start_date);
  if (values.end_date) formData.append("end_date", values.end_date);
  if (values.next_campaign_start_date) {
    formData.append("next_campaign_start_date", values.next_campaign_start_date);
  }

  // Campaign Info
  if (values.campaign_info) {
    const ci = values.campaign_info;
    if (ci.prom_id) formData.append("campaign_info[prom_id]", ci.prom_id);
    if (ci.channel_id) formData.append("campaign_info[channel_id]", ci.channel_id);
    if (ci.pl_bus_name) formData.append("campaign_info[pl_bus_name]", ci.pl_bus_name);
    if (ci.pl_bus_description) formData.append("campaign_info[pl_bus_description]", ci.pl_bus_description);
    if (ci.duration) formData.append("campaign_info[duration]", ci.duration);
    if (ci.display_time) formData.append("campaign_info[display_time]", ci.display_time);
    if (ci.slot !== undefined && ci.slot !== null) formData.append("campaign_info[slot]", ci.slot);

    if (Array.isArray(ci.pl_feature)) {
      ci.pl_feature.forEach((feature, index) => {
        formData.append(`campaign_info[pl_feature][${index}]`, feature);
      });
    }
  }

  // Audience Overview
  if (values.audience_overview) {
    const ao = values.audience_overview;
    if (ao.monthly_foottraffic) formData.append("audience_overview[monthly_foottraffic]", ao.monthly_foottraffic);
    if (ao.male_aud !== undefined && ao.male_aud !== null) formData.append("audience_overview[male_aud]", ao.male_aud);
    if (ao.female_aud !== undefined && ao.female_aud !== null) formData.append("audience_overview[female_aud]", ao.female_aud);
    if (ao.format) formData.append("audience_overview[format]", ao.format);
    if (ao.ad_length) formData.append("audience_overview[ad_length]", ao.ad_length);
    if (ao.launch_time) formData.append("audience_overview[launch_time]", ao.launch_time);
  }

  // Packages
  if (Array.isArray(values.packages)) {
    values.packages.forEach((pkg, index) => {
      if (pkg.name) formData.append(`packages[${index}][name]`, pkg.name);
      if (pkg.price !== undefined && pkg.price !== null) formData.append(`packages[${index}][price]`, pkg.price);
      formData.append(`packages[${index}][is_recommended]`, pkg.is_recommended ? 1 : 0);

      if (Array.isArray(pkg.feature)) {
        pkg.feature.forEach((feat, fIndex) => {
          formData.append(`packages[${index}][feature][${fIndex}]`, feat);
        });
      }
    });
  }

  // File Uploads (Media)
  if (values.cover_image instanceof File) {
    formData.append("cover_image", values.cover_image);
  }

  if (Array.isArray(values.photos)) {
    values.photos.forEach((file) => {
      if (file instanceof File) {
        formData.append("photos[]", file);
      }
    });
  }

  if (Array.isArray(values.videos)) {
    values.videos.forEach((file) => {
      if (file instanceof File) {
        formData.append("videos[]", file);
      }
    });
  }

  if (Array.isArray(values.panaromas)) {
    values.panaromas.forEach((file) => {
      if (file instanceof File) {
        formData.append("panaromas[]", file);
      }
    });
  }

  // Method spoofing for PHP/Laravel multipart update
  if (isEdit) {
    formData.append("_method", "PUT");
  }

  return formData;
};

/**
 * Maps single placement details object received from API GET /auth/placements/:id to form default values
 */
export const mapPlacementToFormValues = (placement) => {
  if (!placement) return {};

  const ci = placement.campaign_info || {};
  const ao = placement.audience_overview || {};
  const pkgs = Array.isArray(placement.packages) ? placement.packages : [];

  return {
    location: placement.location || "",
    city: placement.city || "",
    state: placement.state || "",
    country: placement.country || "",
    zip_code: placement.zip_code || "",
    status: placement.status || "draft",
    campaign_duration: placement.campaign_duration || "30 days",
    start_date: placement.start_date || "",
    end_date: placement.end_date || "",
    next_campaign_start_date: placement.next_campaign_start_date || "",

    campaign_info: {
      prom_id: ci.prom_id ? String(ci.prom_id) : (ci.promotion_type?.id ? String(ci.promotion_type.id) : ""),
      channel_id: ci.channel_id ? String(ci.channel_id) : (ci.channel_type?.id ? String(ci.channel_type.id) : ""),
      pl_bus_name: ci.pl_bus_name || "",
      pl_bus_description: ci.pl_bus_description || "",
      pl_feature: Array.isArray(ci.pl_feature) ? ci.pl_feature : [],
      duration: ci.duration || "30 Days continuous",
      display_time: ci.display_time?.id ? String(ci.display_time.id) : (ci.display_time ? String(ci.display_time) : ""),
      slot: ci.slot || 10,
    },

    audience_overview: {
      monthly_foottraffic: ao.monthly_foottraffic || "",
      male_aud: ao.male_aud || "50.00",
      female_aud: ao.female_aud || "50.00",
      format: ao.format ? String(ao.format) : (ao.format_detail?.id ? String(ao.format_detail.id) : ""),
      ad_length: ao.ad_length ? String(ao.ad_length) : (ao.ad_length_detail?.id ? String(ao.ad_length_detail.id) : ""),
      launch_time: ao.launch_time || "Launch in 24 hours",
    },

    packages: pkgs.length > 0 ? pkgs.map((p) => ({
      id: p.id,
      name: p.name || "",
      price: p.price || 0,
      is_recommended: Boolean(p.is_recommended),
      feature: Array.isArray(p.feature) ? p.feature : [],
    })) : [
      { name: "Basic Package", price: 150, is_recommended: false, feature: ["1 ad play per hour"] },
      { name: "Premium Package", price: 350, is_recommended: true, feature: ["10 ad play per hour"] }
    ],

    // File representations / existing URLs
    existing_cover_image: placement.cover_image || null,
    existing_media: Array.isArray(placement.media) ? placement.media : [],
    cover_image: null,
    photos: [],
    videos: [],
    panaromas: [],
  };
};
