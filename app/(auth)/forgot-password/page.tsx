import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthHeader from "@/components/auth/auth-header";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export default function ForgotPasswordPage() {
    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Forgot Password"
                    subtitle="Enter your email to receive a password reset link."
                />
                <ForgotPasswordForm />
            </AuthCard>
        </AuthLayout>
    );
}