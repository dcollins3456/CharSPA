const randomCharacters = [
    {
        id: "",
        charname: "Balthazar Brawn",
        playbook: "Bruiser",
        portraitURL: "graphics/pictures/balthazar.png",
        pb_description: "A dangerous and intimidating fighter",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "cold", "haunted" ],
        alias: "Balth",
        heritage: "Brawn was genetically engineered by the powerful Tycho corporation to be a superior human being in terms of strength, endurance and fighting ability.",
        background: "Before becoming a mercenary and bruiser-for-hire, Balthazar was a professional pit fighter and champion in the illegal gladiatorial arenas of the Tycho corporation.",
        vice: "Gambling",
        look: "Balthazar is a towering figure, standing at 6'7'' with broad shoulders and muscular arms. He has a shaved head and a scar above his left eyebrow, which he got from a particularly brutal fight in the pit. He often wears tight black clothing that showcases his impressive physique and a variety of tattoos covering his arms and chest.",
        insight_xp: 3,
        prowess_xp: 4,
        resolve_xp: 2,
        doctor: 2,
        hack: 1,
        rig: 1,
        study: 0,
        helm: 2,
        scramble: 1,
        scrap: 2,
        skulk: 1,
        attune: 1,
        command: 2,
        consort: 0,
        sway: 1,
        harm3: "Broken arm",
        harm2_2: "Multiple bruises",
        harm2: "Bashed up face",
        harm1_2: "Strained muscles",
        harm1: "Minor cuts",
        healthclock: 4,
        cred: 2,
        stash: 2,
        armor: true,
        heavy: true,
        special: false,
        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],
        s_items: [
            {
                "name": "Brass Knuckles",
                "description": "Titanium reinforced fists",
                "isSmall": true,
                "boxes": 2,
                "isChecked": false
            },
            {
                "name": "Stun Baton",
                "description": "High voltage shock weapon",
                "isSmall": false,
                "boxes": 2,
                "isChecked": false
            }
        ],
        abilities: [
            "*Unstoppable*: Balthazar's immense strength and endurance allow him to shrug off wounds and keep fighting even when others would be down for the count.",
            "*Pit Fighter*: Balthazar's years of experience in the pit have made him a ruthless and cunning fighter, able to read his opponents and quickly adapt his tactics.",
            "*Intimidation*: Balthazar's size and reputation as a pit fighter often intimidate his opponents, causing them to hesitate or even break in the face of his fury."
        ],
        notes: [
            "*Loyalty to Tycho*: Although he is no longer employed by Tycho, Balthazar still owes them a debt for his creation and training. He may be called upon by Tycho for special missions and will always prioritize their interests.",
            "*Gambling Problem*: Balthazar has a weakness for gambling, often putting himself in debt or in dangerous situations to feed his habit.",
            "*Mercenary*: Balthazar is a mercenary-for-hire, taking on any job that pays well and allows him to indulge his gambling."
        ]
    },
    {
        id: "",
        charname: "Xanthe Blaze",
        playbook: "The Operator",
        portraitURL: "graphics/pictures/xanthe.png",
        pb_description: "smooth and cunning strategist",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "cold", "haunted" ],
        alias: "Blaze",
        heritage: "Cyborg from a high-tech world",
        background: "Former military tactician turned mercenary",
        vice: "Gambling addiction",
        look: "Tall and athletic build, with metallic cybernetic enhancements visible on their face and arms. Always dressed in a sleek, form-fitting suit.",
        insight_xp: 2,
        prowess_xp: 4,
        resolve_xp: 3,
        doctor: 2,
        hack: 3,
        rig: 3,
        study: 2,
        helm: 2,
        scramble: 2,
        scrap: 1,
        skulk: 3,
        attune: 2,
        command: 3,
        consort: 1,
        sway: 2,
        harm3: "Leg injury",
        harm2_2: "Cybernetic arm malfunction",
        harm2: "Head injury",
        harm1_2: "Power Surge",
        harm1: "System overload",
        healthclock: 7,
        cred: 2,
        stash: 23,
        armor: true,
        heavy: false,
        special: true,
        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],
        s_items: [
        {
            name: "*Plasma Pistol*",
            description: "High-powered energy weapon",
            isSmall: true,
            boxes: 2,
            isChecked: false
        },
        {
            name: "*Stealth Generator*",
            description: "Makes wearer invisible",
            isSmall: true,
            boxes: 1,
            isChecked: false
        }
        ],
        abilities: [
        "*Cybernetic Enhancements*: Xanthe has a variety of cybernetic enhancements that give them an edge in combat and hacking abilities",
        "*Tactical Genius*: Xanthe is a natural strategist, able to think several steps ahead in any situation",
        "*Mercenary Experience*: Xanthe has years of experience working as a mercenary, and knows how to navigate dangerous and unpredictable situations"
        ],
        notes: [
        "*Gambling Debt*: Despite their success, Xanthe's gambling addiction has gotten them into debt with some dangerous people",
        "*Loyal to the Crew*: Xanthe values their loyalty to their crew above all else, and will do whatever it takes to protect them"
        ]
    },
    {
        id: "",
        charname: "Kara Thorn",
        playbook: "Skirmisher",
        portraitURL: "graphics/pictures/kara.png",
        pb_description: "Mobile fighter",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "obsessed", "paranoid" ],
        alias: "Killer",
        heritage: "Raised in a pirate crew, expert marksman",
        background: "Survived brutal boarding actions",
        vice: "Thrill-seeking gambler",
        look: "Tattooed and scarred, always with a smirk",

        insight_xp: 1,
        prowess_xp: 3,
        resolve_xp: 2,

        doctor: 2,
        hack: 0,
        rig: 1,
        study: 1,

        helm: 2,
        scramble: 0,
        scrap: 2,
        skulk: 3,

        attune: 1,
        command: 2,
        consort: 1,
        sway: 0,

        harm3: "Leg shattered",
        harm2_2: "Hand broken",
        harm2: "Scarred face",
        harm1_2: "Shot in the arm",
        harm1: "Bruised ego",
        healthclock: 2,

        cred: 3,
        stash: 13,

        armor: true,
        heavy: false,
        special: false,

        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],

        s_items: [
            {
            name: "Blaster pistol",
            description: "Trusted sidearm",
            isSmall: true,
            boxes: 2,
            isChecked: false,
            },
            {
            name: "Vibro knife",
            description: "Souvenir from victim",
            isSmall: true,
            boxes: 2,
            isChecked: false,
            }
        ],

        abilities: [
            "*Quick shot* with a blaster pistol, even when caught off guard",
            "*Evasive* when outnumbered or outgunned",
            "*Expert gambler* able to win big or lose it all"
        ],

        notes: [
            "Never seen without a sly grin",
            "Has a habit of *throwing knives* at inopportune moments",
            "*Never gives up* even when the odds are against them"
        ]
    },
    {
        id: "",
        charname: "Lora Sterling",
        playbook: "Scrapper",
        portraitURL: "graphics/pictures/lora.png",
        pb_description: "A resourceful survivor",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "paranoid", "unstable" ],
        alias: "Lucky",
        heritage: "Raised as an orphan on a backwater planet",
        background: "Worked odd jobs and hustled to survive",
        vice: "Gambling addiction",
        look: "Tough, with scars on her face and arms. Usually has a sly grin. Short hair dyed bright green.",

        insight_xp: 3,
        prowess_xp: 2,
        resolve_xp: 4,

        doctor: 1,
        hack: 2,
        rig: 2,
        study: 1,

        helm: 2,
        scramble: 1,
        scrap: 3,
        skulk: 2,

        attune: 2,
        command: 1,
        consort: 1,
        sway: 2,

        harm3: "Leg injury",
        harm2_2: "Beaten and bruised",
        harm2: "Wounded",
        harm1_2: "Winded",
        harm1: "Scratched",
        healthclock: 3,

        cred: 2,
        stash: 11,
        
        armor: true,
        heavy: false,
        special: false,

        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],

        s_items: [
            {
            name: "Lucky's lucky dice",
            description: "A set of weighted dice",
            isSmall: true,
            boxes: 2,
            isChecked: false
            },
            {
            name: "Laser pistol",
            description: "A small, reliable sidearm",
            isSmall: true,
            boxes: 2,
            isChecked: false
            }
        ],

        abilities: [
            "*Never Give Up* - When things look dire, Lora can rally and keep going. When she spends a *Momentum* to act under fire, she can add an additional +1d to her roll."
        ],

        notes: [
            "*Gambling Addiction* - Lora has a problem with gambling and often finds herself in debt to shady characters."
        ]

    },
    {
        id: "",
        charname: "Zara Zoom",
        playbook: "Scoundrel",
        portraitURL: "graphics/pictures/zara.png",
        pb_description: "A charming rogue",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "cold", "haunted" ],
        alias: "Zara the Quick",
        heritage: "Born on a space-faring merchant ship, Zara grew up constantly on the move and learned to improvise to survive.",
        background: "After years of hustling and cons on various planets, Zara has built a reputation as a thief and con artist.",
        vice: "Gambling on high stakes games",
        look: "Zara has bright green hair and a mischievous grin. They are always dressed in flashy, form-fitting clothing and carry a deck of cards.",
        
        insight_xp: 2,
        prowess_xp: 4,
        resolve_xp: 3,
        
        doctor: 2,
        hack: 1,
        rig: 2,
        study: 0,
        
        helm: 1,
        scramble: 2,
        scrap: 2,
        skulk: 3,
        
        attune: 2,
        command: 0,
        consort: 2,
        sway: 3,

        harm3: "Leg injury",
        harm2_2: "Hand injury",
        harm2: "Concussion",
        harm1_2: "Bruised ego",
        harm1: "Exhausted",
        healthclock: 2,

        cred: 4,
        stash: 22,
        
        armor: false,
        heavy: false,
        special: false,
        
        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],

        s_items: [
            {
            name: "Lucky Deck",
            description: "A deck of cards with a knack for winning",
            isSmall: true,
            boxes: 1,
            isChecked: false,
            },
            {
            name: "Sonic Knife",
            description: "A silent, high-tech knife",
            isSmall: true,
            boxes: 2,
            isChecked: false,
            }
        ],

        abilities: [
            "*Smooth Talker:* Zara can talk their way out of nearly any situation with their charm and wit.",
            "*Fast Hands:* Zara is incredibly quick and nimble, making them a skilled pickpocket.",
            "*Sharp Mind:* Zara is a skilled gambler and con artist, always able to stay one step ahead of their opponents."
        ],

        notes: [
            "*Gambling Addiction:* Zara's vice of gambling often leads them into dangerous situations.",
            "*Flashy Reputation:* Zara's reputation as a flashy thief sometimes attracts unwanted attention."
        ]
    },
    {
        id: "",
        charname: "Nox Blaze",
        playbook: "Racketeer",
        portraitURL: "graphics/pictures/nox.png",

        pb_description: "A cunning criminal mastermind",
        pbxp: 1,
        stress: 1,
        trauma: 1,
        traumatypes: [ "cold", "haunted" ],
        alias: "Blaze",
        heritage: "From a wealthy and powerful political family on Zaltor",
        background: "Turned to a life of crime after being disowned by their family",
        vice: "Gambling addiction",
        look: "Wears a black suit, always carries a deck of cards and a winning smirk",
        
        insight_xp: 4,
        prowess_xp: 2,
        resolve_xp: 3,

        doctor: 0,
        hack: 2,
        rig: 1,
        study: 1,

        helm: 0,
        scramble: 1,
        scrap: 2,
        skulk: 3,

        attune: 0,
        command: 1,
        consort: 3,
        sway: 2,

        harm3: "Shattered ego",
        harm2_2: "Injury to reputation",
        harm2: "Bruised pride",
        harm1_2: "Lost credibility",
        harm1: "Temporary setback",
        healthclock: 3,

        cred: 2,
        stash: 9,
        
        armor: false,
        heavy: false,
        special: false,

        items: [
            {
            "name": "Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "2nd Blaster Pistol",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Melee Weapon",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Heavy Blaster",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Detonator",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Hacking Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Repair Tools",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Medkit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spy Gear",
            "isSmall": false,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Illicit Drugs",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Communicator",
            "isSmall": true,
            "boxes": 1,
            "isChecked": false,
            },
            {
            "name": "Armor",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
            {
            "name": "Spacesuit",
            "isSmall": false,
            "boxes": 2,
            "isChecked": false,
            },
        ],

        s_items: [
            {
            name: "Lucky Deck",
            description: "A deck of cards with a special connection to luck",
            isSmall: true,
            boxes: 1,
            isChecked: false,
            },
            {
            name: "Pulse Pistol",
            description: "A sleek, silent pistol",
            isSmall: false,
            boxes: 2,
            isChecked: false,
            }
        ],

        abilities: [
            "*Gambler's Intuition:* Nox Blaze always seems to know the odds and make the right bet",
            "*Charismatic Leader:* Nox Blaze is able to convince others to follow their lead and work towards their goals",
            "*Smooth Talker:* Nox Blaze is able to talk their way out of sticky situations and talk people into doing what they want"
        ],
        
        notes: [
            "*Disowned:* Nox Blaze was disowned by their wealthy and powerful family and has a vendetta against them",
            "*Gambling Addiction:* Nox Blaze has a serious gambling addiction and will risk everything, including their crew, to feed it",
            "*Blackmail Material:* Nox Blaze has information on several powerful individuals that they use for leverage in their criminal dealings"
        ]
    },
    
]
export default randomCharacters;