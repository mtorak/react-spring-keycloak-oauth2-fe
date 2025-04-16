import { useKeycloak } from "@react-keycloak/web";
import { useEffect, useState } from "react";

type Card = {
    name: string,
    color: string,
    price: number
};

const Cards = () => {

    const { keycloak } = useKeycloak();
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                if (keycloak && keycloak.authenticated) {
                    await keycloak.updateToken();
                    const req = await fetch("http://localhost:1291/cards", {
                        headers: {
                            ["Authorization"]: `Bearer ${keycloak.token}`
                        }
                    });

                    setCards(await req.json());
                }
            } catch (e) {
                console.log('getData() error!', e);
            }
        }

        getData();
    }, [keycloak]);

    return (
        <>
            <div style={{ marginTop: "20px" }}>
                {cards.map((card) => (
                    <div key={card.name} style={{ padding: "10px", marginBottom: "20px" }}>
                        <span>
                            {card.name} - {card.color} | price: {card.price}
                        </span>
                    </div>
                ))}
            </div >
            <button
                type="button"
                className="text-blue-800"
                onClick={() => keycloak.logout()}>
                Logout ({keycloak?.tokenParsed?.preferred_username})
            </button>
        </>
    );
}

export default Cards;