import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, AlertTriangle } from "lucide-react";

const applicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name too long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name too long"),
  streetAddress: z.string().min(5, "Please enter a complete address").optional(),
  zip: z.string().min(3, "Please enter a valid postal/ZIP code").optional(),
  city: z.string().min(2, "City/suburb name required").optional(),
  state: z.string().min(1, "State/territory is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 18 && age <= 100;
  }, "Must be between 18 and 100 years old"),
  ethnicity: z.string().min(1, "Ethnicity is required"),
  citizenshipStatus: z.string().min(1, "Citizenship status is required"),
  employmentStatus: z.string().min(1, "Employment status is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[\+]?[(]?[\d\s\-\(\)]{10,}$/, "Please enter a valid phone number"),
  monthlyIncome: z.number().min(0, "Monthly income must be a positive number").max(999999, "Income amount too large"),
  housingStatus: z.string().min(1, "Housing status is required"),
  fundingType: z.string().optional(),
  grantAmount: z.string().min(1, "Grant amount is required"),
  purposeDescription: z.string().min(20, "Please provide at least 20 characters describing your purpose").max(1000, "Description too long"),
  referredBy: z.string().min(1, "Referral source is required"),
  driverLicenseFront: z.any().optional(),
  driverLicenseBack: z.any().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms and conditions"),
});

type ApplicationForm = z.infer<typeof applicationSchema>;



const ethnicities = [
  "White", "Black or African American", "Native American", "Asian American",
  "Native Hawaiian", "Pacific Islander", "Middle Eastern American", "Hispanic",
  "Latino", "Multi-racial", "Other"
];

const citizenshipStatuses = [
  "US Citizen", "Resident Alien", "Green Card Holder", "Permanent Resident", "Not Sure"
];

const employmentStatuses = [
  "Employed Full-Time", "Employed Part-Time", "Self Employed", "Unemployed",
  "Retired", "Collecting Social Security", "Disabled"
];

const fundingTypes = [
  "Business Funding", "Real Estate: Investing / Business", "Community Funding",
  "Education / Tuition Funding", "Real Estate: Personal Home Purchase / 1st Time Home Buyer",
  "Personal Assistance", "Personal Assistance: Home Repairs"
];

const grantAmounts = [
  "$4,000 To Deliver $150,000.00", "$5,000 To Deliver $200,000.00",
  "$6,000 To Deliver $300,000.00", "$7,000 To Deliver $400,000.00",
  "$8,000 To Deliver $550,000.00", "$9,000 To Deliver $750,000.00",
  "$10,000 To Deliver $1,000,000.00", "$15,000 To Deliver $3,000,000.00"
];

export default function Apply() {
  const { toast } = useToast();
  const [frontLicenseFile, setFrontLicenseFile] = useState<string>("");
  const [backLicenseFile, setBackLicenseFile] = useState<string>("");
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema),
    mode: "onBlur", // Real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      zip: "",
      city: "",
      state: "",
      gender: "",
      dateOfBirth: "",
      ethnicity: "",
      citizenshipStatus: "",
      employmentStatus: "",
      email: "",
      phone: "",
      monthlyIncome: 0,
      housingStatus: "",
      fundingType: "",
      grantAmount: "",
      purposeDescription: "",
      referredBy: "",
      driverLicenseFront: "",
      driverLicenseBack: "",
    },
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: ApplicationForm) => {
      // For now, convert files to base64 strings for storage
      const processedData = {
        ...data,
        driverLicenseFront: frontLicenseFile,
        driverLicenseBack: backLicenseFile,
      };
      const response = await apiRequest("POST", "/api/applications", processedData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted Successfully! ✅",
        description: "Thank you! Your application has been received. You'll hear from our team within 2-3 business days.",
      });
      form.reset();
      setFrontLicenseFile("");
      setBackLicenseFile("");
      setCurrentStep(1);
      setCompletedSteps(new Set());
      // Clear saved draft
      localStorage.removeItem('ieo-application-draft');
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'front' | 'back') => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }
    
    const fileName = file.name;
    const setterFn = type === 'front' ? setFrontLicenseFile : setBackLicenseFile;
    
    setterFn(fileName);
    
    // Create a file reader to convert file to base64 for demo purposes
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      const fieldName = type === 'front' ? 'driverLicenseFront' : 'driverLicenseBack';
      form.setValue(fieldName, base64);
      
      toast({
        title: "File Uploaded",
        description: `${type === 'front' ? 'Front' : 'Back'} of license uploaded successfully.`,
      });
    };
    reader.readAsDataURL(file);
  };

  // Auto-save form data to localStorage
  React.useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem('ieo-application-draft', JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Load saved form data on mount
  React.useEffect(() => {
    const savedData = localStorage.getItem('ieo-application-draft');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        Object.keys(parsedData).forEach(key => {
          if (parsedData[key] && key !== 'agreeToTerms') {
            form.setValue(key as keyof ApplicationForm, parsedData[key]);
          }
        });
        toast({
          title: "Draft Restored",
          description: "Your previous application draft has been restored.",
        });
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
  }, []);

  const onSubmit = (data: ApplicationForm) => {
    applicationMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Apply For IEO Program</h1>
          <p className="text-xl text-gray-600">Tell Us About You And Your Funding Needs</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-2xl text-center">Application Form</CardTitle>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
                <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              {/* Step Indicators */}
              <div className="flex justify-between mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step === currentStep 
                          ? 'bg-blue-600 text-white' 
                          : completedSteps.has(step)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {completedSteps.has(step) ? '✓' : step}
                    </div>
                    <span className="ml-2 text-xs text-gray-600 hidden sm:block">
                      {step === 1 && 'Personal'}
                      {step === 2 && 'Financial'}
                      {step === 3 && 'Funding'}
                      {step === 4 && 'Documents'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your first name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter your last name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="e.g., 123 Main Street or 45 Collins Street" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="zip"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal/ZIP Code</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., 10001 or 3000" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City/Suburb</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., New York or Melbourne" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Territory *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="e.g., NY, CA, NSW, VIC" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Driver's License Upload */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Driver's License Front and Back *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fessa-blue transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Front of License</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'front')}
                          className="hidden"
                          id="front-license"
                        />
                        <label htmlFor="front-license" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </label>
                        {frontLicenseFile && (
                          <p className="text-sm text-green-600 mt-2">{frontLicenseFile}</p>
                        )}
                      </div>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fessa-blue transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 mb-2">Back of License</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e, 'back')}
                          className="hidden"
                          id="back-license"
                        />
                        <label htmlFor="back-license" className="cursor-pointer">
                          <Button type="button" variant="outline" size="sm">
                            Choose File
                          </Button>
                        </label>
                        {backLicenseFile && (
                          <p className="text-sm text-green-600 mt-2">{backLicenseFile}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="ethnicity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ethnicity *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select ethnicity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ethnicities.map((ethnicity) => (
                                <SelectItem key={ethnicity} value={ethnicity}>
                                  {ethnicity}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="citizenshipStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Citizenship Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {citizenshipStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="employmentStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employment Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select employment status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {employmentStatuses.map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} placeholder="your@email.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} placeholder="(555) 123-4567" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="monthlyIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monthly Income *</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) => field.onChange(Number(e.target.value))}
                              placeholder="Enter monthly income"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="housingStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Own a House or Rent? *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select housing status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="own">Own</SelectItem>
                              <SelectItem value="rent">Rent</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Funding Information Section */}
                <div className="space-y-6 border-t pt-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Choose which type of funding you are interested in:
                  </h3>

                  

                  <FormField
                    control={form.control}
                    name="grantAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grant List *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select grant amount" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {grantAmounts.map((amount) => (
                              <SelectItem key={amount} value={amount}>
                                {amount}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">
                        NOTE: We'll like to inform you that all claims are Tax free and you don't have to pay the money back. And all fees are to be paid upfront
                      </p>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="purposeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Describe What You Will Use The Money For *</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={4}
                            placeholder="Please provide a detailed description of how you plan to use the funding..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referredBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referred By Who? *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Who referred you to our program?" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Document Upload Section */}
                <div className="space-y-6 border-t pt-8">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Required Documents
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please upload clear photos of both sides of your driver's license or state ID
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="driverLicenseFront"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver's License - Front *</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'front')}
                                className="cursor-pointer"
                              />
                              {frontLicenseFile && (
                                <p className="text-xs text-green-600">
                                  Selected: {frontLicenseFile}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                Upload a clear photo of the front of your driver's license
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="driverLicenseBack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Driver's License - Back *</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'back')}
                                className="cursor-pointer"
                              />
                              {backLicenseFile && (
                                <p className="text-xs text-green-600">
                                  Selected: {backLicenseFile}
                                </p>
                              )}
                              <p className="text-xs text-gray-500">
                                Upload a clear photo of the back of your driver's license
                              </p>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-800">
                        Document Upload Requirements
                      </p>
                      <ul className="text-sm text-blue-700 mt-1 space-y-1">
                        <li>• Images must be clear and readable</li>
                        <li>• Accepted formats: JPG, PNG, GIF</li>
                        <li>• Maximum file size: 10MB per image</li>
                        <li>• Both front and back photos are required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit Section */}
                <div className="space-y-6 border-t pt-8">
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="mt-1"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the Terms and Conditions *
                          </FormLabel>
                          <p className="text-xs text-gray-500">
                            By checking this box, I confirm that all information provided is accurate and I agree to the IEO program terms and conditions.
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="text-center pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="fessa-blue hover:fessa-blue-dark text-white font-semibold text-lg px-12 py-4"
                      disabled={applicationMutation.isPending || !form.watch('agreeToTerms')}
                    >
                      {applicationMutation.isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        "Submit Application"
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 mt-2">
                      Your application will be reviewed within 2-3 business days
                    </p>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
