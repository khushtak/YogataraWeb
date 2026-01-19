
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoadingState = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container-custom mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-64 bg-muted rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <div className="h-6 bg-muted rounded w-1/2"></div>
                <div className="h-24 bg-muted rounded"></div>
                <div className="h-6 bg-muted rounded w-1/3"></div>
                <div className="h-40 bg-muted rounded"></div>
              </div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoadingState;
