"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button" 
import { Trash2, Pencil, BookOpen, PlusCircle} from "lucide-react"
import { Card, CardHeader, CardFooter, CardContent } from "@/components/ui/card"


interface Deck {
    id: string
    title: string
    description: string
    cardCount: number
    createAt: string
}

export default function DeckList(){
    const [decks, setDecks] = useState<Deck[]>([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchDeck()
    }, [])

    const fetchDeck = async () => {
        try {
            const response = await fetch("/api")

            if (!response.ok){
                throw new Error("Failed to fetch decks.")
            }

            const data = await response.json()
            setDecks(data)

        } catch(error) {
            console.error("Error fetching deck: ", error)
            alert("Failed to load decks. Please try again.")

        } finally {
            setLoading(false)
        }
    }

    const deleteDeck = (id: string) => {
        // alert("Deck Deleted")
        // const delDeck = decks.filter((deck) => deck.id !== id)
        // console.log(delDeck)

        if (!confirm("Do you want to delete this deck ?")) return
            setDecks(decks.filter((deck) => deck.id !== id))
    }

    if (loading){
        return (
            <div className="grid gap-4 grid-cols1 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardHeader className="h-24 bg-muted/50"></CardHeader>
                        <CardContent className="h-16 bg-muted/30 mt-2"/>
                        <CardFooter className="h-12 bg-muted/20 mt-2"/>
                    </Card>
                ))}
            </div>
        )
    }

    if (decks.length === 0) {
        return (
            <div className="border rounded-md p-8 text-center">
                <div className="flex flex-col items-center justify-center space-y-3 py-6">
                    <BookOpen className="h-10 w-10 text-muted-foreground"/>
                    <div className="space-t-1">
                        <h3>No deck found.</h3>
                        <p className="text-sm text-muted-foreground">Create your first flashcard deck to get started.</p>
                    </div>
                    <Link href="/decks/new">
                    <Button>
                        <PlusCircle className="mr-1 h-4 w-4"/>
                        Create deck
                    </Button>
                    </Link>
                </div>  
            </div>
        )
    }


    return (
        <div className="grid gap-4 grid-cols-1 md:grid-cols2 lg:grid-cols-3">
            {decks.map((deck) => (
                <div key={deck.id} className="border rounded-2xl p-6">
                    <div className="mb-2">
                        <h3 className="font-bold">{deck.title}</h3>
                        <p className="text-sm text-muted-foreground">{deck.description}</p>
                    </div>
                    <div className="flex items-center text-sx text-muted-foreground mb-3">
                        <span className="mr-2">{deck.cardCount} cards</span>
                        <span>Created {new Date(deck.createAt).toDateString()}</span>
                    </div>

                    <div className="flex justify-between">
                        <Link href={`/decks/${deck.id}/study`}>
                            <Button>
                                Study
                            </Button>
                        </Link>

                        <div className="flex space-x-2">
                            <Link href={`/decks/${deck.id}/edit`}>
                                <Button>
                                    <Pencil className="h-3.5 w-3.5"/>
                                </Button>
                            </Link>

                            <Button onClick={() => deleteDeck(deck.id)}>
                                <Trash2 className="h-8 w-8 text-destructive"/> 
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}