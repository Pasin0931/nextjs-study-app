import { CardContent } from "@/components/ui/card";
import { Newsreader } from "next/font/google";
import { NextResponse } from "next/server";

const decks = [
    {
        id: "1",
        title: "Deck 1",
        description: "This is the first deck",
        cardCount: 10,
        createAt: "2023-10-01"
    },
    {
        id: "2",
        title: "Deck 2",
        description: "This is the second deck",
        cardCount: 20,
        createAt: "2023-10-03"
    },
    {
        id: "3",
        title: "Deck 3",
        description: "This is the third deck",
        cardCount: 30,
        createAt: "2023-10-03"
    }
]

// C R U D ***----***

// C: create (post method)
export async function POST() {
    const newDeck = {
        id: "4",
        title: "Deck 4",
        description: "This is the fourth deck",
        CardCount: 40,
        createAt: "2023-10-04"
    }

    decks.push(newDeck)
    return NextResponse.json(newDeck, {status: 201})
}

// R: read (get method)
export async function GET() {
    return NextResponse.json(decks)
}
