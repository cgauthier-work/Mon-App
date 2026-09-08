import { FILMS, filtrerParGenre, trierPar } from "./lib/utils";
import ListeFilms from "./composants/ListeFilms";

const parTitre = trierPar(FILMS, "titre");
const sfDrame = filtrerParGenre(FILMS, "Drame");
const aucun = filtrerParGenre(FILMS, undefined);

export default function App() {
  return (
    <main className="max-w-6xl mx-auto p-6 flex flex-col gap-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Tous les films</h2>
        <ListeFilms films={parTitre} onSelection={(f) => alert(f.titre)} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Drames</h2>
        <ListeFilms films={sfDrame} onSelection={(f) => alert(f.titre)} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Comédies</h2>
        <ListeFilms films={aucun} messageVide="Aucune comédie dans le catalogue." />
      </section>
    </main>
  );
}