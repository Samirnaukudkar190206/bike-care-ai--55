import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ArrowDownRight,
  MessageCircle,
  ShieldCheck,
  Clock,
  Gauge
} from 'lucide-react';

import Header from '../components/Header.jsx';
import HeroCockpit from '../components/HeroCockpit.jsx';
import BikeGrid from '../components/BikeGrid.jsx';
import DiagnosisSection from '../components/DiagnosisSection.jsx';
import BookingSection from '../components/BookingSection.jsx';
import ProofSection from '../components/ProofSection.jsx';
import ContactSection from '../components/ContactSection.jsx';
import Footer from '../components/Footer.jsx';

import {
  fetchBikes,
  diagnoseIssue,
  fetchBookings,
  createBooking,
  createContactMessage,
  fetchInsights
} from '../lib/api.js';

const INITIAL_BOOKING = {
  name: '',
  email: '',
  phone: '',
  service: 'Routine service',
  preferredDate: '',
  preferredTime: 'Morning · 8:00–11:00',
  notes: ''
};

const INITIAL_CONTACT = {
  name: '',
  email: '',
  message: ''
};

export default function Home() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();

  // Queries
  const bikesQuery = useQuery({
    queryKey: ['/api/bikes'],
    queryFn: fetchBikes
  });

  const bookingsQuery = useQuery({
    queryKey: ['/api/bookings'],
    queryFn: fetchBookings
  });

  const insightsQuery = useQuery({
    queryKey: ['/api/insights'],
    queryFn: fetchInsights
  });

  // State
  const [selectedBikeId, setSelectedBikeId] = useState('');
  const [customBikeName, setCustomBikeName] = useState('');
  const [issue, setIssue] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [diagnosisError, setDiagnosisError] = useState('');

  const [bookingForm, setBookingForm] = useState(INITIAL_BOOKING);
  const [bookingError, setBookingError] = useState('');

  const [contactForm, setContactForm] = useState(INITIAL_CONTACT);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactError, setContactError] = useState('');

  const bikes = bikesQuery.data ?? [];
  const isOther = selectedBikeId === 'other';

  const selectedBike = useMemo(() => {
    if (isOther) return undefined;
    return bikes.find((b) => b.id === selectedBikeId) ?? bikes[0];
  }, [bikes, isOther, selectedBikeId]);

  const hasValidBike = Boolean(selectedBike || (isOther && customBikeName.trim()));

  // Auto-select first bike when loaded
  useEffect(() => {
    if (!selectedBikeId && bikes[0]) {
      setSelectedBikeId(bikes[0].id);
    }
  }, [bikes, selectedBikeId]);

  // Mutations
  const diagnoseMutation = useMutation({
    mutationFn: diagnoseIssue,
    onSuccess: (data) => {
      setDiagnosisResult(data);
    },
    onError: () => {
      setDiagnosisError('The guide is taking a pit stop. Try again in a moment.');
    }
  });

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookings'] });
      setLocation(`/booking/${data.id}`);
    },
    onError: () => {
      setBookingError('We could not save that booking. Check your details and try again.');
    }
  });

  const contactMutation = useMutation({
    mutationFn: createContactMessage,
    onSuccess: () => {
      setContactSuccess(true);
      setContactForm(INITIAL_CONTACT);
    },
    onError: () => {
      setContactError('Your message hit a rough patch. Please send it again.');
    }
  });

  // Handlers
  const handleDiagnose = (e) => {
    e.preventDefault();
    setDiagnosisError('');

    if (!hasValidBike) {
      setDiagnosisError(
        isOther
          ? 'Enter your bike name first so the guide can use the right context.'
          : 'Pick your bike first so the guide can be specific.'
      );
      return;
    }

    if (issue.trim().length < 3) {
      setDiagnosisError('Tell us a little more about what your bike is doing.');
      return;
    }

    diagnoseMutation.mutate({
      bikeId: isOther ? 'other' : selectedBike?.id,
      customBikeName: isOther ? customBikeName.trim() : undefined,
      issue: issue.trim()
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setBookingError('');

    if (!hasValidBike) {
      setBookingError(
        isOther
          ? 'Enter your bike name before booking a service.'
          : 'Choose a bike before booking a service.'
      );
      return;
    }

    if (
      !bookingForm.name.trim() ||
      !bookingForm.email.trim() ||
      !bookingForm.phone.trim() ||
      !bookingForm.preferredDate
    ) {
      setBookingError('Fill in your name, email, phone, and preferred date.');
      return;
    }

    bookingMutation.mutate({
      bikeId: isOther ? 'other' : selectedBike?.id,
      customBikeName: isOther ? customBikeName.trim() : undefined,
      name: bookingForm.name.trim(),
      email: bookingForm.email.trim(),
      phone: bookingForm.phone.trim(),
      service: bookingForm.service,
      preferredDate: bookingForm.preferredDate,
      preferredTime: bookingForm.preferredTime,
      notes: bookingForm.notes.trim() || undefined
    });
  };

  const handleContact = (e) => {
    e.preventDefault();
    setContactError('');

    if (
      contactForm.name.trim().length < 2 ||
      !contactForm.email.trim() ||
      contactForm.message.trim().length < 5
    ) {
      setContactError('Add your name, a valid email, and a little more detail.');
      return;
    }

    contactMutation.mutate({
      name: contactForm.name.trim(),
      email: contactForm.email.trim(),
      message: contactForm.message.trim()
    });
  };

  return (
    <div className="page-shell noise">
      <Header />

      <main id="top">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden bg-[hsl(var(--secondary))] pb-20 pt-32 text-[hsl(var(--background))] md:pb-28 md:pt-40">
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[hsl(var(--primary)/.12)] blur-3xl" />
          <div className="absolute bottom-[-7rem] left-[-5rem] h-64 w-64 rounded-full bg-[hsl(var(--accent)/.15)] blur-3xl" />

          <div className="container-wide relative grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
            <div className="rise">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--background)/.18)] bg-[hsl(var(--background)/.06)] px-3 py-2 text-xs font-semibold text-[hsl(var(--background)/.75)]">
                <span className="status-dot" /> Your garage, in your pocket
              </div>

              <h1 className="display-font max-w-[670px] text-[clamp(3.3rem,8vw,7.3rem)] font-extrabold leading-[.89] tracking-[-.075em]">
                Keep the ride <span className="text-[hsl(var(--primary))]">ready.</span>
              </h1>

              <p className="mt-7 max-w-[470px] text-lg leading-relaxed text-[hsl(var(--background)/.7)]">
                Clear answers for the little weird sounds. Effortless service for the moments that
                should never slow you down.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#garage" className="btn btn-primary" data-testid="link-find-bike">
                  Find your bike <ArrowDownRight size={17} />
                </a>
                <a
                  href="#guide"
                  className="btn border-[hsl(var(--background)/.2)] bg-transparent text-[hsl(var(--background))] hover:bg-[hsl(var(--background)/.08)]"
                  data-testid="link-issue-help"
                >
                  Describe an issue <MessageCircle size={17} />
                </a>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-[hsl(var(--background)/.55)]">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[hsl(var(--primary))]" /> Rider-first
                  guidance
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-[hsl(var(--accent))]" /> No garage jargon
                </span>
              </div>
            </div>

            <div className="rise-2 relative">
              <HeroCockpit />

              <div className="absolute right-0 top-4 max-w-[190px] rounded-2xl border border-[hsl(var(--background)/.15)] bg-[hsl(var(--background)/.08)] p-4 backdrop-blur-sm">
                <p className="mono-font text-[10px] uppercase tracking-[.14em] text-[hsl(var(--background)/.55)]">
                  Service pulse
                </p>
                <p className="display-font mt-2 text-2xl font-bold">
                  {insightsQuery.data?.responseTime ?? '< 15 min'}
                </p>
                <p className="mt-1 text-xs text-[hsl(var(--background)/.6)]">
                  Typical first reply
                </p>
              </div>

              <div className="absolute bottom-5 left-0 rounded-2xl bg-[hsl(var(--primary))] p-4 text-[hsl(var(--primary-foreground))] shadow-lg">
                <Gauge size={22} />
                <p className="mono-font mt-2 text-[10px] font-bold uppercase tracking-[.12em]">
                  Ride state
                </p>
                <p className="text-sm font-bold">Dialled in</p>
              </div>
            </div>
          </div>
        </section>

        {/* 01 / GARAGE SECTION */}
        <BikeGrid
          bikes={bikes}
          selectedId={selectedBikeId}
          onSelect={(b) => {
            setSelectedBikeId(b.id);
            setDiagnosisResult(null);
          }}
          onSelectOther={() => {
            setSelectedBikeId('other');
            setDiagnosisResult(null);
          }}
          isLoading={bikesQuery.isLoading}
          isError={bikesQuery.isError}
          onRetry={() => bikesQuery.refetch()}
          customBikeName={customBikeName}
          onCustomBikeChange={setCustomBikeName}
          isOther={isOther}
          selectedBike={selectedBike}
        />

        {/* 02 / GUIDED HELP */}
        <DiagnosisSection
          issue={issue}
          onIssueChange={setIssue}
          onSubmit={handleDiagnose}
          isPending={diagnoseMutation.isPending}
          error={diagnosisError}
          result={diagnosisResult}
          hasValidBike={hasValidBike}
        />

        {/* 03 / WORKSHOP TIME */}
        <BookingSection
          bikes={bikes}
          selectedBikeId={selectedBikeId}
          onBikeSelectChange={(val) => {
            setSelectedBikeId(val);
            setDiagnosisResult(null);
          }}
          customBikeName={customBikeName}
          onCustomBikeNameChange={setCustomBikeName}
          formData={bookingForm}
          onFormChange={(field, val) =>
            setBookingForm((prev) => ({ ...prev, [field]: val }))
          }
          onSubmit={handleBooking}
          isPending={bookingMutation.isPending}
          error={bookingError}
          hasValidBike={hasValidBike}
          isOther={isOther}
        />

        {/* GARAGE SIGNALS PROOF */}
        <ProofSection
          insights={insightsQuery.data}
          bookingsCount={bookingsQuery.data?.length ?? 1}
          isLoading={bookingsQuery.isLoading}
        />

        {/* 04 / CONTACT */}
        <ContactSection
          formData={contactForm}
          onFormChange={(field, val) =>
            setContactForm((prev) => ({ ...prev, [field]: val }))
          }
          onSubmit={handleContact}
          isPending={contactMutation.isPending}
          isSuccess={contactSuccess}
          onResetSuccess={() => setContactSuccess(false)}
          error={contactError}
          responseTime={insightsQuery.data?.responseTime}
        />
      </main>

      <Footer />
    </div>
  );
}
