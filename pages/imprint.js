import Link from "next/link";
import { trackPage } from "../src/common/tracking";

export default function Imprint() {
  trackPage("imprint");

  return (<>
    <h1>Impressum</h1>
    <p>Angaben gemäß § 5 TMG:</p>

    <h2>Kontakt</h2>
    <p><b>E-Mail:</b> coolboard @ protonmail.com</p>
    <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
    <p>
      Robert Hostlowsky
    </p>
    <h2>Hinweise zur Website</h2>
    <h3>Urheberrechtliche Hinweise</h3>
    <p>
      Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
      Urheberrecht.
      Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
      Urheberrechtes
      bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
      sind
      nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom
      Betreiber
      erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
      gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
      entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
    </p>
    <p>Das Logo und favicon basiert auf den Icons folgender Autoren:
    </p>
    <p>
      “Freezer Cold” icon by Creaticca Creative
      Agency from the Noun Project.
      <br/>
      “Browser” icon by Didzis Gruznovs from
      the Noun Project.
    </p>
    <p>
      Diese Seite verwendet den Inter Typeface https://rsms.me/inter/ (originated by Rasmus, @rsms on github),
      lizensiert unter der <a href="../public/sil-openfont-license.txt">Open Font License (OFL)</a>
    </p>
    <h3>Haftung für Inhalte</h3>
    <p>
      Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
      Aktualität
      der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
      Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
      Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder
      nach
      Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
      Sperrung
      der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung
      ist
      jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
      entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>

    <h3>Haftung für Links</h3>
    <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb
      können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets
      der
      jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
      Verlinkung
      auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      Eine
      permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
      Rechtsverletzung
      nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
    </p>
    <h3>Datenschutz</h3>
    <p>
      Siehe
      <Link href="/privacy">
        <a>Privacy</a>
      </Link>
      Seite
    </p>
    </>
  )
}
