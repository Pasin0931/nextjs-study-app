// import Image from "next/image";
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react";
import Link from "next/link"
import DeckList from "@/components/deck-list"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex item-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" > Study decks </h1>
          <p className="text-muted-foreground mt-1"> Create and manage your flashcard decks </p>
        </div>

        <Link href="/decks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Deck
          </Button>
        </Link>
        
      </div>

      <DeckList />

    </div>
  );
}
