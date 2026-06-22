import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProgressBar from '@/components/hostDashboard/createPlacementStep/ProgressBar';
import Step1About from '@/components/hostDashboard/createPlacementStep/Step1About';
import Step2Campaign from '@/components/hostDashboard/createPlacementStep/Step2Campaign';
import Step3Audience from '@/components/hostDashboard/createPlacementStep/Step3Audience';
import Step4Pricing from '@/components/hostDashboard/createPlacementStep/Step4Pricing';
import Step5Upload from '@/components/hostDashboard/createPlacementStep/Step5Upload';

const CreatePlacement = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const {
        register,
        handleSubmit,
        control,
        trigger,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            whatsIncluded: [],
            campaignDuration: '',
            displayTime: 'operating_hours',
            promotionType: '',
            channelType: '',
            slotsPerMonth: '1',
            customSlots: '',
            footTraffic: '',
            format: '',
            adLength: '15',
            launchTime: '',
            basicPackage: { price: 20, features: [] },
            standardPackage: { price: 40, features: [] },
            premiumPackage: { price: 60, features: [] },
        },
    });

    const adLength = watch('adLength');

    useEffect(() => {
        if (adLength) {
            const length = parseInt(adLength, 10);
            let basePrice = 20;
            if (length === 15) basePrice = 20;
            else if (length === 30) basePrice = 40;
            else if (length === 45) basePrice = 60;
            else if (length === 60) basePrice = 80;
            else if (length === 90) basePrice = 120;

            setValue('basicPackage.price', basePrice);
            setValue('standardPackage.price', basePrice * 2);
            setValue('premiumPackage.price', basePrice * 3);
        }
    }, [adLength, setValue]);

    const onSubmit = (data) => {
        console.log('Final Form Data:', data);
    };

    const handleNext = async () => {
        let fieldsToValidate = [];
        if (currentStep === 1) fieldsToValidate = ['title', 'description', 'whatsIncluded'];
        if (currentStep === 2) fieldsToValidate = ['campaignDuration', 'displayTime', 'promotionType', 'channelType', 'slotsPerMonth'];
        if (currentStep === 3) fieldsToValidate = ['footTraffic', 'format', 'adLength', 'launchTime'];
        if (currentStep === 4) fieldsToValidate = ['basicPackage', 'standardPackage', 'premiumPackage'];

        const isValid = await trigger(fieldsToValidate);
        if (isValid && currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1);
            // Optional: Scroll to the new step
            setTimeout(() => {
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/30 pb-20">
            <div className=" px-4 py-8">
                {/* Header */}
                <Link
                    to="/host/dashboard/my-placements"
                    className="flex items-center gap-2 text-base font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to My placement
                </Link>

                <div className="bg-white rounded-[32px] shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 overflow-hidden">
                    <div className="px-10 py-8 border-b border-gray-50 flex justify-between items-center bg-white">
                        <h1 className="text-2xl font-bold text-[#1a1a1a]">Create Placement</h1>
                        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-10 space-y-12">
                        {/* Step 1 is always visible */}
                        <Step1About register={register} errors={errors} control={control} Controller={Controller} />

                        {/* Appending steps based on currentStep */}
                        {currentStep >= 2 && (
                            <Step2Campaign register={register} errors={errors} control={control} Controller={Controller} />
                        )}
                        {currentStep >= 3 && (
                            <Step3Audience register={register} errors={errors} control={control} Controller={Controller} />
                        )}
                        {currentStep >= 4 && (
                            <Step4Pricing register={register} errors={errors} control={control} Controller={Controller} />
                        )}
                        {currentStep >= 5 && (
                            <Step5Upload register={register} errors={errors} control={control} />
                        )}

                        {/* Action Buttons */}
                        <div className="pt-4">
                            {currentStep < totalSteps ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="w-full bg-[#1a1a1a] text-white h-[56px] rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#000] transition-all active:scale-[0.99]"
                                >
                                    Next
                                    <ArrowRight className="size-5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="w-full bg-Primary text-white h-[56px] rounded-xl font-medium flex items-center justify-center hover:opacity-95 transition-all active:scale-[0.99] shadow-lg shadow-Primary/20"
                                >
                                    Create Service
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