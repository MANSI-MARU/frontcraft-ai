import AuthLayout from "@/components/auth/auth-layout";
import AuthCard from "@/components/auth/auth-card";
import AuthHeader from "@/components/auth/auth-header";
import LoginForm from "@/components/auth/login-form";
import SocialLogin from "@/components/auth/social-login";

export default function LoginPage() {
    return (
        <AuthLayout>
            <AuthCard>
                <AuthHeader />
                <LoginForm />
                <SocialLogin />
            </AuthCard>
        </AuthLayout>
    );
}