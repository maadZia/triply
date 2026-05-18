import { useActionState } from "react";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input, InputGroup } from "@/components/forms/Input";
import { Button } from "@/components/atoms/Button";
import { Divider } from "@/components/atoms/Divider";
import { LightCard } from "@/components/cards/LightCard";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

type ActionState = {
  error: string | null;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  async function registerAction(
    _prevState: ActionState | null,
    formData: FormData,
  ): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const currentState = {
      error: null,
      name,
      email,
      password,
      confirmPassword,
    };

    if (password !== confirmPassword) {
      return { ...currentState, error: "Hasła nie są identyczne" };
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
      return currentState;
    } catch (err: unknown) {
      let errorMessage = "Nie udało się utworzyć konta. Spróbuj ponownie.";
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/email-already-in-use":
            errorMessage =
              "Ten adres e-mail jest już powiązany z innym kontem.";
            break;
          case "auth/invalid-email":
            errorMessage = "Podano nieprawidłowy adres e-mail.";
            break;
        }
      }
      return { ...currentState, error: errorMessage };
    }
  }

  const [state, submitAction, isPending] = useActionState(registerAction, {
    error: null,
  });

  const handleGoogleRegister = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const validatePasswords = () => {
    const pwd = (
      document.getElementById("register-password") as HTMLInputElement
    )?.value;
    const confirmPwd = document.getElementById(
      "register-confirm-password",
    ) as HTMLInputElement;
    if (confirmPwd) {
      if (pwd !== confirmPwd.value) {
        confirmPwd.setCustomValidity("Hasła nie są identyczne");
      } else if (pwd.length < 8) {
        confirmPwd.setCustomValidity(
          "Hasło jest zbyt słabe. Użyj co najmniej 8 znaków.",
        );
      } else {
        confirmPwd.setCustomValidity("");
      }
    }
  };

  return (
    <main className="flex min-h-[80vh] items-start justify-center px-4">
      <LightCard className="w-full max-w-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-contentPrimary">
            Utwórz konto
          </h1>
          <p className="text-accentDark text-sm">
            i zacznij planować swoją kolejną przygodę.
          </p>
        </div>

        <form action={submitAction} className="space-y-5">
          <div>
            <label
              className="text-sm font-medium text-contentPrimary mb-1 block"
              htmlFor="register-name"
            >
              Imię i nazwisko
            </label>
            <InputGroup>
              <UserIcon data-slot="icon" />
              <Input
                id="register-name"
                name="name"
                type="text"
                defaultValue={state?.name}
                placeholder="Jan Kowalski"
                required
              />
            </InputGroup>
          </div>

          <div>
            <label
              className="text-sm font-medium text-contentPrimary mb-1 block"
              htmlFor="register-email"
            >
              Email
            </label>
            <InputGroup>
              <EnvelopeIcon data-slot="icon" />
              <Input
                id="register-email"
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
              htmlFor="register-password"
            >
              Hasło
            </label>
            <InputGroup>
              <LockClosedIcon data-slot="icon" />
              <Input
                id="register-password"
                name="password"
                type="password"
                defaultValue={state?.password}
                placeholder="Min. 8 znaków"
                onChange={validatePasswords}
                required
              />
            </InputGroup>
          </div>

          <div>
            <label
              className="text-sm font-medium text-contentPrimary mb-1 block"
              htmlFor="register-confirm-password"
            >
              Potwierdź hasło
            </label>
            <InputGroup>
              <LockClosedIcon data-slot="icon" />
              <Input
                id="register-confirm-password"
                name="confirmPassword"
                type="password"
                defaultValue={state?.confirmPassword}
                placeholder="Powtórz hasło"
                onChange={validatePasswords}
                required
              />
            </InputGroup>
          </div>

          <p className="text-[11px] text-contentSecondary text-center px-2">
            Rejestrując się, akceptujesz nasz{" "}
            <span className="text-accentDark font-semibold">Regulamin</span>{" "}
            oraz{" "}
            <span className="text-accentDark font-semibold">
              Politykę Prywatności
            </span>
            .
          </p>

          {state.error && (
            <p className="text-sm text-contentError">{state.error}</p>
          )}

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Rejestracja..." : "Utwórz konto"}
          </Button>
        </form>

        <div className="flex items-center gap-3">
          <Divider soft />
          <span className="text-[11px] text-contentSecondary whitespace-nowrap tracking-wide">
            lub kontynuuj przez
          </span>
          <Divider soft />
        </div>

        <form action={handleGoogleRegister}>
          <Button outline type="submit" className="w-full">
            Google
          </Button>
        </form>

        <p className="text-center text-sm text-contentSecondary">
          Masz już konto?{" "}
          <a
            href="/login"
            className="text-accentDark font-semibold hover:underline"
          >
            Zaloguj się
          </a>
        </p>
      </LightCard>
    </main>
  );
}
