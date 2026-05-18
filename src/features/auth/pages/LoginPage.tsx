import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input, InputGroup } from "@/components/forms/Input";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { LightCard } from "@/components/cards/LightCard";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";

type ActionState = {
  error: string | null;
  email?: string;
  password?: string;
};

export default function LoginPage() {
  const navigate = useNavigate();

  async function loginAction(
    _prevState: ActionState | null,
    formData: FormData,
  ): Promise<ActionState> {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const currentState = { error: null, email, password };

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      return currentState;
    } catch (err: unknown) {
      let errorMessage = "Nie udało się zalogować. Spróbuj ponownie.";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-credential":
          case "auth/user-not-found":
          case "auth/wrong-password":
            errorMessage = "Nieprawidłowy adres e-mail lub hasło.";
            break;
          case "auth/too-many-requests":
            errorMessage =
              "Zbyt wiele nieudanych prób logowania. Spróbuj ponownie później.";
            break;
          case "auth/invalid-email":
            errorMessage = "Podano nieprawidłowy adres e-mail.";
            break;
        }
      }
      return { ...currentState, error: errorMessage };
    }
  }

  const [state, submitAction, isPending] = useActionState(loginAction, {
    error: null,
  });

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <main className="flex min-h-[80vh] items-start justify-center px-4">
      <LightCard className="w-full max-w-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-contentPrimary">
            Zaloguj się
          </h1>
          <p className="text-accentDark text-sm">
            aby planować kolejne przygody.
          </p>
        </div>

        <form action={submitAction} className="space-y-5">
          <div>
            <label
              className="text-sm font-medium text-contentPrimary mb-1 block"
              htmlFor="login-email"
            >
              Adres e-mail
            </label>
            <InputGroup>
              <EnvelopeIcon data-slot="icon" />
              <Input
                id="login-email"
                name="email"
                type="email"
                defaultValue={state?.email}
                placeholder="twoj@email.pl"
                required
              />
            </InputGroup>
          </div>

          <div>
            <label
              className="text-sm font-medium text-contentPrimary mb-1 block"
              htmlFor="login-password"
            >
              Hasło
            </label>
            <InputGroup>
              <LockClosedIcon data-slot="icon" />
              <Input
                id="login-password"
                name="password"
                type="password"
                defaultValue={state?.password}
                placeholder="••••••••"
                required
              />
            </InputGroup>
          </div>

          {state.error && (
            <p className="text-sm text-contentError">{state.error}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Logowanie..." : "Zaloguj się"}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Divider soft />
          <span className="text-xs font-medium text-contentSecondary whitespace-nowrap uppercase tracking-wider">
            lub
          </span>
          <Divider soft />
        </div>

        <form action={handleGoogleLogin}>
          <Button outline type="submit" className="w-full">
            Google
          </Button>
        </form>

        <p className="text-center text-sm text-contentSecondary">
          Nie masz konta?{" "}
          <a
            href="/register"
            className="text-accentDark font-semibold hover:underline"
          >
            Zarejestruj się
          </a>
        </p>
      </LightCard>
    </main>
  );
}
