
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ButtonCustom } from '@/components/ui/button-custom';

const NotFoundState = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container-custom mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist or has been removed.</p>
          <ButtonCustom href="/">
            Browse All Courses
          </ButtonCustom>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundState;
