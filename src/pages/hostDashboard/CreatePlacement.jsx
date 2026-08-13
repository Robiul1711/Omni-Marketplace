import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import ProgressBar from '@/components/hostDashboard/createPlacementStep/ProgressBar';
import Step1About from '@/components/hostDashboard/createPlacementStep/Step1About';
import Step2Campaign from '@/components/hostDashboard/createPlacementStep/Step2Campaign';
import Step3Audience from '@/components/hostDashboard/createPlacementStep/Step3Audience';
import Step4Pricing from '@/components/hostDashboard/createPlacementStep/Step4Pricing';
import Step5Upload from '@/components/hostDashboard/createPlacementStep/Step5Upload';
import { buildPlacementFormData, mapPlacementToFormValues } from '@/services/placementService';

const CreatePlacement = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Refs for scrolling smoothly to specific step sections
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);
  const step4Ref = useRef(null);
  const step5Ref = useRef(null);

  const [options, setOptions] = useState({
    promotion_types: [],
    channel_types: [],
    formats: [],
    ad_lengths: [],
    display_times: [],
  });

  const [loadingData, setLoadingData] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      location: '',
      city: '',
      state: '',
      country: '',
      zip_code: '',
      status: 'draft',
      campaign_duration: '',
      start_date: '',
      end_date: '',
      next_campaign_start_date: '',
      campaign_info: {
        prom_id: '',
        channel_id: '',
        pl_bus_name: '',
        pl_bus_description: '',
        pl_feature: [],
        duration: '',
        display_time: '',
        slot: '',
      },
      audience_overview: {
        monthly_foottraffic: '',
        male_aud: '',
        female_aud: '',
        format: '',
        ad_length: '',
        launch_time: '',
      },
      packages: [
        {
          name: '',
          price: '',
          is_recommended: false,
          feature: [],
        },
      ],
      cover_image: null,
      photos: [],
      videos: [],
      panaromas: [],
    },
  });

  // Fetch placement options dynamically
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await axiosSecure.get('/auth/placements/options');
        if (res.data?.data) {
          setOptions(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch placement options:', err);
      }
    };
    fetchOptions();
  }, [axiosSecure]);

  // Fetch existing placement details if in edit mode
  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setLoadingData(true);
      try {
        const res = await axiosSecure.get(`/auth/placements/${id}`);
        const placement = res.data?.data;
        if (placement) {
          const mapped = mapPlacementToFormValues(placement);
          reset(mapped);
        }
      } catch (err) {
        toast.error('Failed to load placement details.');
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    fetchDetails();
  }, [id, axiosSecure, reset]);

  const onSubmit = async (formValues) => {
    setIsSubmitting(true);
    try {
      const formData = buildPlacementFormData(formValues, isEdit);
      const url = isEdit ? `/auth/placements/${id}` : '/auth/placements';

      const res = await axiosSecure.post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.status || res.status === 200 || res.status === 201) {
        toast.success(res.data?.message || (isEdit ? 'Placement updated successfully!' : 'Placement created successfully!'));
        navigate('/host/dashboard/my-placements');
      } else {
        toast.error(res.data?.message || 'Failed to submit placement');
      }
    } catch (err) {
      console.error('Placement submission error:', err);
      const msg = err?.response?.data?.message || 'Error submitting placement';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (currentStep === 1) {
      fieldsToValidate = [
        'campaign_info.pl_bus_name',
        'campaign_info.pl_bus_description',
        'location',
        'city',
        'state',
        'country',
        'zip_code',
        'campaign_info.pl_feature',
      ];
    }
    if (currentStep === 2) {
      fieldsToValidate = [
        'campaign_duration',
        'start_date',
        'end_date',
        'campaign_info.prom_id',
        'campaign_info.channel_id',
        'campaign_info.duration',
        'campaign_info.display_time',
        'campaign_info.slot',
      ];
    }
    if (currentStep === 3) {
      fieldsToValidate = [
        'audience_overview.monthly_foottraffic',
        'audience_overview.male_aud',
        'audience_overview.female_aud',
        'audience_overview.format',
        'audience_overview.ad_length',
        'audience_overview.launch_time',
      ];
    }
    if (currentStep === 4) {
      fieldsToValidate = ['packages'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid && currentStep < totalSteps) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Scroll smoothly to the newly opened step section
      setTimeout(() => {
        let targetRef = null;
        if (nextStep === 2) targetRef = step2Ref;
        if (nextStep === 3) targetRef = step3Ref;
        if (nextStep === 4) targetRef = step4Ref;
        if (nextStep === 5) targetRef = step5Ref;

        if (targetRef?.current) {
          targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500 font-medium">
          <Loader2 className="animate-spin size-6 text-Primary" />
          Loading placement details...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 pb-20">
      <div className="px-4 py-8 ">
        {/* Header */}
        <Link
          to="/host/dashboard/my-placements"
          className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to My placement
        </Link>

        <div className="bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
          <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-white rounded-t-[32px]">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">
              {isEdit ? 'Edit Placement' : 'Create Placement'}
            </h1>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-12">
            {/* Step 1 */}
            <Step1About
              register={register}
              errors={errors}
              control={control}
              Controller={Controller}
            />

            {/* Step 2 */}
            {currentStep >= 2 && (
              <div ref={step2Ref} className="pt-4 scroll-mt-6">
                <Step2Campaign
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                  options={options}
                />
              </div>
            )}

            {/* Step 3 */}
            {currentStep >= 3 && (
              <div ref={step3Ref} className="pt-4 scroll-mt-6">
                <Step3Audience
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                  options={options}
                />
              </div>
            )}

            {/* Step 4 */}
            {currentStep >= 4 && (
              <div ref={step4Ref} className="pt-4 scroll-mt-6">
                <Step4Pricing
                  register={register}
                  errors={errors}
                  control={control}
                  Controller={Controller}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            )}

            {/* Step 5 */}
            {currentStep >= 5 && (
              <div ref={step5Ref} className="pt-4 scroll-mt-6">
                <Step5Upload
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
                  className="px-6 h-[56px] rounded-xl border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#1a1a1a] text-white h-[56px] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.99]"
                >
                  Next
                  <ArrowRight className="size-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-Primary text-white h-[56px] rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-95 transition-all active:scale-[0.99] shadow-lg shadow-Primary/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin size-5" />
                      {isEdit ? 'Updating Placement...' : 'Creating Placement...'}
                    </>
                  ) : (
                    <>{isEdit ? 'Update Placement' : 'Publish Placement'}</>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlacement;