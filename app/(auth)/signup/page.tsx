import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthHeader from "@/components/auth/auth-header";
import SignupForm from "@/components/auth/signup-form";
import SocialLogin from "@/components/auth/social-login";

export default function SignupPage() {
    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader
                    title="Create Account"
                    subtitle="Start building amazing interfaces with AI."
                />
                <SignupForm />
                <SocialLogin />
            </AuthCard>
        </AuthLayout>
    );
}