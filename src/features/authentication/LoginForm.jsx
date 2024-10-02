import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
    const [email, setEmail] = useState("gemedatam@gmail.com");
    const [password, setPassword] = useState("1212");

    const { login, isLoading } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login({ email, password });
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    autoComplete="username"
                    value={email}
                    disabled={isLoading}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    disabled={isLoading}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormRowVertical>
            <FormRowVertical>
                {isLoading ? (
                    <SpinnerMini />
                ) : (
                    <Button size="large" onClick={handleSubmit}>Login</Button>
                )}
            </FormRowVertical>
        </Form>
    );
}

export default LoginForm;