import {
    Button,
    Card,
    Container,
    Input,
    Typography,
} from "@/lib/runtime/components";

export default function TestPage() {
    return (
        <Container>
            <Card>
                <Typography variant="title">
                    Login
                </Typography>

                <Typography variant="subtitle">
                    Welcome Back
                </Typography>

                <Input placeholder="Email" />

                <Input
                    type="password"
                    placeholder="Password"
                />

                <Button>
                    Login
                </Button>
            </Card>
        </Container>
    );
}