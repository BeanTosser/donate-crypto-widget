let coins = document.getElementsByClassName("coin-logo");
let acceptedCoins = ["btc", "doge", "eth", "usdc", "xmr"];
let coinsContainer;
let currentCoinIndex = 0;
let currentCoinShift = 0;

const COIN_SIZE = 3.9;
const WIDGET_WIDTH = 17;
const COIN_SPACE = 7;
const COINS_SHIFT_AMOUNT = COIN_SPACE;
const INITIAL_COIN_CONTAINER_POSITION_X = WIDGET_WIDTH / 2.0 - COIN_SIZE / 2.0;
const TRANSLATION_FROM_CENTER_AMOUNT = COIN_SIZE / 2.0 + COIN_SPACE / 2.0; 
const WALLET_ADDRESS = "1AMWnpKhw5haLJ2sZgxJja1ScXL7HjFtmj";

let addressDisplay;
let addressDisplayIsVisible = false;
let addressBox;
let address = "mivKpYd9VVCbppWeypBBxQTjMzm39QFpvx";
let coinImages = [];
let addressDisplayItems = [];

function initialize(){
    coinsContainer = document.getElementById("coins-container");
    addressDisplay = document.getElementById("address-display");
    addressDisplayItems = addressDisplay.childNodes;
    addressBox = addressDisplay.children[0];
    addressBox.setAttribute("value", WALLET_ADDRESS);
    coinsContainer.style.width = (COIN_SIZE + COIN_SPACE).toString() + "em";
    coinsContainer.style.transform = "translateX(" + INITIAL_COIN_CONTAINER_POSITION_X.toString() + "em)";
    acceptedCoins.forEach((coin) => {
        let imageFilePath = "./img/" + coin + "ButtonLogo.png";
        console.log("image file patH: " + imageFilePath);
        coinImages.push(imageFilePath);
    })
    coins = document.getElementsByClassName("coin-logo");
    coins[0].src = coinImages[currentCoinIndex];
    coins[1].src = coinImages[currentCoinIndex + 1];
    coins[1].style.opacity = 0.0;
    coinsContainer.style.left = 17.0 / 2.0 - COIN_SIZE - COIN_SPACE / 2.0;
}

function toggleAddressDisplay(){
    if(addressDisplayIsVisible){
        addressDisplayIsVisible = false;
        addressDisplay.className = "hidden";
        addressDisplayItems.forEach(item => {
            item.className = "address-display hidden";
            console.log("raising display item");
        })
        console.log("hiding");
    } else {
        addressDisplayIsVisible = true;
        addressDisplay.style.display = "flex";
        addressDisplay.className = ""
        addressDisplayItems.forEach(item => {
            item.className = "address-display";
            console.log("lowering display item");
        })
        console.log("showing");
    }
}

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(walletAddress);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function clickRight(){
    let oldCoinIndex = currentCoinIndex;
    if(currentCoinIndex === coinImages.length-1){
        currentCoinIndex = 0;
    } else {
        currentCoinIndex++;
    }
    console.log("New coin index: " + currentCoinIndex);
    //First, reassign images
    let referenceCoinIndex = 0;
    coins[0].src=coinImages[oldCoinIndex];
    coins[1].src = coinImages[currentCoinIndex];
    //set initial transparencies
    coins[0].style.opacity = 1;
    coins[1].style.opacity = 0;
    //Shift all the coins left one coin
    //currentCoinShift = COINS_SHIFT_AMOUNT;
    currentCoinShift = 0;
    //Place the container such that coin1 is in the center of the widget
    coinsContainer.style.transform = "translateX( " + (currentCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
    let interval = setInterval(() => {
        coinsContainer.style.transform = "translateX( " + (currentCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
        currentCoinShift-= 0.566;
        let progressPercentage = -currentCoinShift / COINS_SHIFT_AMOUNT;
        coins[0].style.opacity =  1 - progressPercentage;
        coins[1].style.opacity = progressPercentage;
        if(currentCoinShift <= -COINS_SHIFT_AMOUNT){
            clearInterval(interval);
            coinsContainer.style.transform = "translateX(" + (INITIAL_COIN_CONTAINER_POSITION_X + COINS_SHIFT_AMOUNT).toString() + ")";
            coins[0].style.opacity = 0.0;
            coins[1].style.opacity = 1.0;
        }
    }, 10)
}

function clickLeft(){
    let oldCoinIndex = currentCoinIndex;
    if(currentCoinIndex === 0){
        currentCoinIndex = coins.length - 1;
    } else {
        currentCoinIndex--;
    }
    //First, reassign images
    coins[0].src=coinImages[currentCoinIndex];
    coins[1].src=coinImages[oldCoinIndex];
    //set initial transparencies
    coins[0].style.opacity = 0;
    coins[1].style.opacity = 1;
    //Shift all the coins left one coin
    currentCoinShift = -COINS_SHIFT_AMOUNT;
    coinsContainer.style.transform = "translateX( " + (currentCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
    let interval = setInterval(() => {
        coinsContainer.style.transform = "translateX( " + (currentCoinShift + INITIAL_COIN_CONTAINER_POSITION_X).toString() + "em";
        currentCoinShift+=0.566;
        let progressPercentage = -currentCoinShift / COINS_SHIFT_AMOUNT;
        coins[0].style.opacity = 1-progressPercentage;
        coins[1].style.opacity = progressPercentage;
        if(currentCoinShift >= 0){
            clearInterval(interval);
            coins[0].style.opacity = 1.0;
            coins[1].style.opacity = 0.0;
            coinsContainer.style.transform = "translateX( " + INITIAL_COIN_CONTAINER_POSITION_X + ")";
        }
    },10)
}

