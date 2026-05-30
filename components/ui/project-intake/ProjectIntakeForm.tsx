"use client";

import { useActionState, useEffect, useMemo, useState, type FormEvent } from "react";
import Reveal from "@/components/motion/Reveal";
import { WebflowLink } from "@/components/webflow/WebflowLink";
import IntakeFieldError from "@/components/ui/project-intake/IntakeFieldError";
import IntakeNav from "@/components/ui/project-intake/IntakeNav";
import IntakeOptionGrid from "@/components/ui/project-intake/IntakeOptionGrid";
import {
  initialProjectIntakeFormState,
} from "@/lib/project-intake/action-state";
import { submitProjectIntake } from "@/lib/project-intake/actions";
import {
  BUDGETS,
  BUSINESS_TYPES,
  HIRING_INTENTS,
  INDUSTRIES,
  PLATFORMS,
  PROJECT_TYPES,
  TIMELINES,
  WEB_REQUIREMENTS,
  getIntakeStepIds,
  needsIndustryOther,
  needsPlatform,
  needsWebRequirement,
  stepIndexForField,
  type IntakeStepId,
} from "@/lib/project-intake/form-config";

type IntakeValues = {
  projectType: string;
  webRequirement: string;
  platform: string;
  businessType: string;
  industry: string;
  industryOther: string;
  timeline: string;
  budget: string;
  hiringIntent: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyValues: IntakeValues = {
  projectType: "",
  webRequirement: "",
  platform: "",
  businessType: "",
  industry: "",
  industryOther: "",
  timeline: "",
  budget: "",
  hiringIntent: "",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

function validateIntakeStep(
  stepId: IntakeStepId,
  values: IntakeValues,
): Record<string, string> {
  const errors: Record<string, string> = {};

  switch (stepId) {
    case "projectType":
      if (!values.projectType) {
        errors.projectType = "Select a project type";
      }
      break;
    case "webRequirement":
      if (!values.webRequirement) {
        errors.webRequirement = "Select a project requirement";
      }
      break;
    case "platform":
      if (!values.platform) {
        errors.platform = "Select a platform";
      }
      break;
    case "businessType":
      if (!values.businessType) {
        errors.businessType = "Select a business type";
      }
      break;
    case "industry":
      if (!values.industry) {
        errors.industry = "Select an industry";
      }
      break;
    case "industryOther":
      if (!values.industryOther.trim()) {
        errors.industryOther = "Please describe your industry";
      }
      break;
    case "timeline":
      if (!values.timeline) {
        errors.timeline = "Select a timeline";
      }
      break;
    case "budget":
      if (!values.budget) {
        errors.budget = "Select a budget range";
      }
      break;
    case "hiringIntent":
      if (!values.hiringIntent) {
        errors.hiringIntent = "Select how ready you are to hire";
      }
      break;
    case "contact":
      if (!values.name.trim()) {
        errors.name = "Name is required";
      }
      if (!values.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = "Enter a valid email address";
      }
      break;
  }

  return errors;
}

export default function ProjectIntakeForm() {
  const [state, formAction, pending] = useActionState(
    submitProjectIntake,
    initialProjectIntakeFormState,
  );
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<IntakeValues>(emptyValues);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  const stepIds = useMemo(
    () =>
      getIntakeStepIds({
        projectType: values.projectType,
        industry: values.industry,
      }),
    [values.projectType, values.industry],
  );

  const totalSteps = stepIds.length;
  const currentStepId = stepIds[step - 1];
  const isLastStep = step === totalSteps;

  const isSuccess = state.status === "success";
  const isError = state.status === "error";

  useEffect(() => {
    setStep((current) => Math.min(current, Math.max(totalSteps, 1)));
  }, [totalSteps]);

  useEffect(() => {
    if (!state.values || state.status === "idle") return;

    setValues((current) => ({
      ...current,
      ...state.values,
    }));

    if (state.fieldErrors) {
      const firstField = Object.keys(state.fieldErrors)[0];
      if (firstField) {
        setStep(
          stepIndexForField(firstField, {
            projectType: state.values?.projectType ?? values.projectType,
            industry: state.values?.industry ?? values.industry,
          }),
        );
      }
      setStepErrors(state.fieldErrors);
    }
  }, [state.fieldErrors, state.status, state.values, values.industry, values.projectType]);

  const updateValue = <K extends keyof IntakeValues>(key: K, value: IntakeValues[K]) => {
    setValues((current) => {
      const next = { ...current, [key]: value };

      if (key === "projectType") {
        if (!needsWebRequirement(value)) {
          next.webRequirement = "";
        }
        if (!needsPlatform(value)) {
          next.platform = "";
        }
      }

      if (key === "industry" && value !== "other") {
        next.industryOther = "";
      }

      return next;
    });

    setStepErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleNext = () => {
    if (!currentStepId) return;

    const errors = validateIntakeStep(currentStepId, values);
    if (Object.keys(errors).length > 0) {
      setStepErrors(errors);
      return;
    }

    setStepErrors({});
    setStep((current) => Math.min(current + 1, totalSteps));
  };

  const handleBack = () => {
    setStepErrors({});
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!currentStepId) return;

    const errors = validateIntakeStep(currentStepId, values);
    if (Object.keys(errors).length > 0) {
      event.preventDefault();
      setStepErrors(errors);
    }
  };

  const fieldError = (name: keyof IntakeValues) =>
    stepErrors[name] ?? state.fieldErrors?.[name];

  const renderStep = (stepId: IntakeStepId) => {
    switch (stepId) {
      case "projectType":
        return (
          <IntakeOptionGrid
            name="projectType"
            legend="What kind of project are you looking for?"
            options={PROJECT_TYPES}
            value={values.projectType}
            onChange={(value) => updateValue("projectType", value)}
            error={fieldError("projectType")}
            disabled={pending}
          />
        );
      case "webRequirement":
        return (
          <IntakeOptionGrid
            name="webRequirement"
            legend="What is your project requirement?"
            options={WEB_REQUIREMENTS}
            value={values.webRequirement}
            onChange={(value) => updateValue("webRequirement", value)}
            error={fieldError("webRequirement")}
            disabled={pending}
          />
        );
      case "platform":
        return (
          <IntakeOptionGrid
            name="platform"
            legend="Which platform is your website built on?"
            options={PLATFORMS}
            value={values.platform}
            onChange={(value) => updateValue("platform", value)}
            error={fieldError("platform")}
            disabled={pending}
          />
        );
      case "businessType":
        return (
          <IntakeOptionGrid
            name="businessType"
            legend="What type of business is this for?"
            options={BUSINESS_TYPES}
            value={values.businessType}
            onChange={(value) => updateValue("businessType", value)}
            error={fieldError("businessType")}
            disabled={pending}
          />
        );
      case "industry":
        return (
          <IntakeOptionGrid
            name="industry"
            legend="What industry do you operate in?"
            options={INDUSTRIES}
            value={values.industry}
            onChange={(value) => updateValue("industry", value)}
            error={fieldError("industry")}
            disabled={pending}
          />
        );
      case "industryOther":
        return (
          <div className="intake-text-field intake-text-field--centered">
            <label className="intake-question" htmlFor="intake-industry-other">
              Tell us about your industry
            </label>
            <input
              id="intake-industry-other"
              className="form-input w-input"
              name="industryOtherDisplay"
              type="text"
              maxLength={500}
              value={values.industryOther}
              onChange={(event) => updateValue("industryOther", event.target.value)}
              disabled={pending}
              aria-invalid={Boolean(fieldError("industryOther"))}
            />
            <IntakeFieldError message={fieldError("industryOther")} />
          </div>
        );
      case "timeline":
        return (
          <IntakeOptionGrid
            name="timeline"
            legend="When is your estimated deadline?"
            options={TIMELINES}
            value={values.timeline}
            onChange={(value) => updateValue("timeline", value)}
            error={fieldError("timeline")}
            disabled={pending}
          />
        );
      case "budget":
        return (
          <IntakeOptionGrid
            name="budget"
            legend="What is your estimated budget for this project?"
            options={BUDGETS}
            value={values.budget}
            onChange={(value) => updateValue("budget", value)}
            error={fieldError("budget")}
            disabled={pending}
          />
        );
      case "hiringIntent":
        return (
          <IntakeOptionGrid
            name="hiringIntent"
            legend="How likely are you to hire a professional?"
            options={HIRING_INTENTS}
            value={values.hiringIntent}
            onChange={(value) => updateValue("hiringIntent", value)}
            error={fieldError("hiringIntent")}
            disabled={pending}
          />
        );
      case "contact":
        return (
          <div className="intake-contact-fields">
            <div className="intake-text-field intake-text-field--centered">
              <label className="intake-question" htmlFor="intake-name">
                What is your name?
              </label>
              <input
                id="intake-name"
                className="form-input w-input"
                type="text"
                maxLength={256}
                value={values.name}
                onChange={(event) => updateValue("name", event.target.value)}
                disabled={pending}
                aria-invalid={Boolean(fieldError("name"))}
              />
              <IntakeFieldError message={fieldError("name")} />
            </div>
            <div className="intake-contact-row">
              <div className="intake-text-field">
                <label className="intake-question intake-question--compact" htmlFor="intake-email">
                  Email address
                </label>
                <input
                  id="intake-email"
                  className="form-input w-input"
                  type="email"
                  maxLength={256}
                  placeholder="you@example.com"
                  value={values.email}
                  onChange={(event) => updateValue("email", event.target.value)}
                  disabled={pending}
                  aria-invalid={Boolean(fieldError("email"))}
                />
                <IntakeFieldError message={fieldError("email")} />
              </div>
              <div className="intake-text-field">
                <label className="intake-question intake-question--compact" htmlFor="intake-phone">
                  Phone number{" "}
                  <span className="intake-optional">(optional)</span>
                </label>
                <input
                  id="intake-phone"
                  className="form-input w-input"
                  type="tel"
                  maxLength={500}
                  placeholder="(555) 555-5555"
                  value={values.phone}
                  onChange={(event) => updateValue("phone", event.target.value)}
                  disabled={pending}
                />
              </div>
            </div>
            <div className="intake-text-field intake-text-field--centered">
              <label className="intake-question" htmlFor="intake-notes">
                Anything else we should know?{" "}
                <span className="intake-optional">(optional)</span>
              </label>
              <textarea
                id="intake-notes"
                className="form-input w-input"
                maxLength={5000}
                rows={4}
                value={values.notes}
                onChange={(event) => updateValue("notes", event.target.value)}
                disabled={pending}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isSuccess) {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <p className="contact-form-success__title">Thank you!</p>
        <p className="contact-form-success__text">
          Your project details have been received. I&apos;ll review everything and
          send a quote to your email soon.
        </p>
        <p className="contact-form-success__text">
          <WebflowLink href="index.html" className="contact-form-success__link">
            Return to home
          </WebflowLink>
        </p>
      </div>
    );
  }

  return (
    <div className="intake-form-wrap">
      <form
        className="intake-form form w-form"
        action={formAction}
        onSubmit={handleSubmit}
        noValidate
      >
        {Object.entries(values).map(([key, value]) => (
          <input key={key} type="hidden" name={key} value={value} />
        ))}
        <div className="contact-honeypot" aria-hidden="true">
          <label htmlFor="intake-company">Company</label>
          <input
            id="intake-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <Reveal key={currentStepId} as="div" className="intake-form__step" delay={0}>
          {currentStepId ? renderStep(currentStepId) : null}
        </Reveal>

        <IntakeNav
          step={step}
          totalSteps={totalSteps}
          onBack={handleBack}
          onNext={handleNext}
          pending={pending}
          isLastStep={isLastStep}
        />

        {isError && !state.fieldErrors ? (
          <div className="contact-form-error" role="alert">
            {state.formError ??
              "Something went wrong while submitting the form. Please try again."}
          </div>
        ) : null}
      </form>
    </div>
  );
}
