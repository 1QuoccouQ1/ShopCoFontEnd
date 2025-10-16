import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function EmailConfirmationPage() {
  return (
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-white">
        <div className="w-full max-w-md text-center">
          {/* Email Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
              <Mail className="w-10 h-10 text-foreground" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold mb-3">Check Your Email</h1>

          {/* Description */}
          <p className="text-muted-foreground mb-8 leading-relaxed">
            We've sent a confirmation link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>

          {/* Additional Info */}
          <div className="bg-muted rounded-lg p-4 mb-6 text-sm text-left">
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">
                Didn't receive the email?
              </span>{" "}
              Check your spam folder or wait a few minutes for it to arrive.
            </p>
          </div>

          {/* Resend Button */}
          <Button variant="outline" className="w-full mb-4 bg-transparent">
            Resend Confirmation Email
          </Button>

          {/* Back to Home */}
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block"
          >
            Back to Home
          </Link>
        </div>
      </main>
  );
}
