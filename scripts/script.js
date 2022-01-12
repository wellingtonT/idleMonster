// Default config
let perClick = 1;

// Points Config
let points = {
    current: document.getElementById('current'),
    perSecond: document.getElementById('perSecond'),
};

// Health config
let health = {
    healthBar: document.getElementById('health-bar'),
    healthNumber: document.getElementById('health')
};

// Monster config
const AMOUNT_MONSTERS_IMAGE = 3;
let monsterCurrent = 0;
let monsters = [
    {
        name: "monster 1",
        life: 5,
        currentLife: 5
    }
]
let monsterImage = document.getElementById('monster-image');

// Level Config
let level = document.getElementById('level');

// Upgrade config
let upgrades = [
    {
        name: "upgrade 1",
        cost: 50,
        amount: 0,
        perSecond: 1,
        image: 'upgrade-1'
    },
    {
        name: "upgrade 2",
        cost: 500,
        amount: 0,
        perSecond: 2,
        image: 'upgrade-2'
    },
    {
        name: "upgrade 3",
        cost: 5000,
        amount: 0,
        perSecond: 3,
        image: 'upgrade-3'
    },
    {
        name: "upgrade 4",
        cost: 15000,
        amount: 0,
        perSecond: 4,
        image: 'upgrade-4'
    },
    {
        name: "upgrade 5",
        cost: 25000,
        amount: 0,
        perSecond: 5,
        image: 'upgrade-5'
    }
]

createUpgrades = () => {
    let upgradeContainer = document.getElementById('upgrade-container');

    upgrades.forEach((upgrade, index) => {
        let itemUpgrade = document.createElement("div");
        let amount = document.createElement("span");
        let costContainer = document.createElement("div");
        let cost = document.createElement("span");

        itemUpgrade.classList.add("border", "item-upgrade");
        amount.classList.add("amount");
        costContainer.classList.add("cost-container");
        cost.classList.add("cost");

        itemUpgrade.id = `upgrade-${index + 1}`;
        amount.id = `amount-upgrade-${index + 1}`;
        cost.id = `cost-upgrade-${index + 1}`;

        amount.innerText = upgrade.amount;
        cost.innerText = upgrade.cost;

        costContainer.appendChild(cost);
        itemUpgrade.appendChild(amount);
        itemUpgrade.appendChild(costContainer);
        upgradeContainer.appendChild(itemUpgrade);

        if (typeof window.addEventListener === 'function') {
            itemUpgrade.addEventListener('click', function () {
                onClickUpgrade(index, amount, cost);
            });
        }
    });
}

onClickUpgrade = (index, amount, cost) => {
    if (parseInt(points.current.innerText) >= upgrades[index].cost) {
        points.current.innerText = Math.round(parseInt(points.current.innerText) - upgrades[index].cost);

        upgrades[index].amount++;
        amount.innerText = upgrades[index].amount;

        upgrades[index].cost = Math.round(upgrades[index].cost * 1.2);
        cost.innerText = upgrades[index].cost

        points.perSecond.innerText = parseInt(points.perSecond.innerText) + upgrades[index].perSecond;
    }
}

monsterClicked = () => {
    decreaseMonsterLife('click');
    increaseCurrent(perClick);
}

decreaseMonsterLife = (type) => {
    monsters[monsterCurrent].currentLife = type === 'click' ?
        monsters[monsterCurrent].currentLife - perClick :
        monsters[monsterCurrent].currentLife - parseInt(points.perSecond.innerText);
    health.healthBar.style.width = `${(monsters[monsterCurrent].currentLife * 100) / monsters[monsterCurrent].life}%`;
    health.healthNumber.innerText = monsters[monsterCurrent].currentLife.toFixed(2);

    if (monsters[monsterCurrent].currentLife <= 0) {
        newMonster();
    }
}

newMonster = () => {
    health.healthBar.style.width = "100%"
    monsterCurrent++;
    const newMonsterLife = monsters[monsterCurrent - 1].life * 1.2;

    monsters.push({
        name: `monster ${monsterCurrent + 1}`,
        life: newMonsterLife,
        currentLife: newMonsterLife
    });

    health.healthNumber.innerText = monsters[monsterCurrent].currentLife.toFixed(2);
    monsterImage.src = `./assets/monster-${Math.round((Math.random() * (AMOUNT_MONSTERS_IMAGE - 1)) + 1)}.png`

    increaseLevel();
}

increaseLevel = () => {
    level.innerText = parseInt(level.innerText) + 1;
}

increaseCurrent = (value) => {
    points.current.innerText = parseInt(points.current.innerText) + value;
}

// Init
health.healthNumber.innerText = monsters[monsterCurrent].life;
points.current.innerText = 0;
points.perSecond.innerText = 0;
level.innerText = 1;
createUpgrades();
setInterval(() => {
    points.current.innerText = parseInt(points.current.innerText) + parseInt(points.perSecond.innerText);
    decreaseMonsterLife('idle')
}, 1000);
