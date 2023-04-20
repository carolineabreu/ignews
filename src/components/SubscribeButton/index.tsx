import { useSession, signIn } from "next-auth/react";
import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import { useRouter } from "next/router";

export function SubscribeButton() {
  const { data: session } = useSession();
  const router = useRouter();
  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return; //pro código não continuar sendo executado
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      // ver uma opção melhor err: any
      console.log(err);
    }
  }

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
