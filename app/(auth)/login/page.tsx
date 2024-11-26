import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from '@/components/auth/login-form';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Login - PERNAS Next',
  description: 'Login to your PERNAS account',
};

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Image
            src="/logo.svg"
            alt="PERNAS Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          PERNAS Next Demo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This is a demo application showcasing a legal case management system.&rdquo;
            </p>
            <footer className="text-sm">Demo Purpose Only</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Demo Login
            </h1>
            <p className="text-sm text-muted-foreground">
              This is a demonstration version with mock data
            </p>
          </div>
          <Alert variant="default">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Demo Credentials</AlertTitle>
            <AlertDescription className="mt-2">
              <strong>Admin Access:</strong>
              <br />
              Email: admin@pernas.com
              <br />
              <strong>Solicitor Access:</strong>
              <br />
              Email: solicitor@pernas.com
              <br />
              <span className="text-xs text-muted-foreground mt-1 block">
                Any password will work - this is a demo
              </span>
            </AlertDescription>
          </Alert>
          <LoginForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <Link href="/register" className="hover:text-brand underline underline-offset-4">
              Don&apos;t have an account? Sign up
            </Link>
          </p>
          <div className="text-center text-xs text-muted-foreground">
            <p>This is a demonstration application.</p>
            <p>All data shown is mock data for illustration purposes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}