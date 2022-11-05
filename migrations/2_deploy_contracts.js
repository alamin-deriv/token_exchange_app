const Dai = artifacts.require("mocks/Dai.sol");
const Bat = artifacts.require("mocks/Bat.sol");
const Rep = artifacts.require("mocks/Rep.sol");
const Zrx = artifacts.require("mocks/Zrx.sol");
const Dex = artifacts.require("Dex.sol");

const [DAI, BAT, REP, ZRX] = ["DAI", "BAT", "REP", "ZRX"].map((ticker) =>
  web3.utils.fromAscii(ticker)
);

const SIDE = {
  BUY: 0,
  SELL: 1,
};

module.exports = async function (deployer, _network, accounts) {
  console.log(_network);
  const [trader1, trader2, trader3, trader4, _] = accounts;
  await Promise.all(
    [Dex, Dai, Bat, Rep, Zrx ].map((contract) => deployer.deploy(contract))
  );
  const [dex, dai, bat, rep, zrx] = await Promise.all(
    [Dex, Dai, Bat, Rep, Zrx].map((contract) => contract.deployed())
  );



  await Promise.all([
    dex.addToken(DAI, dai.address),
    dex.addToken(BAT, bat.address),
    dex.addToken(REP, rep.address),
    dex.addToken(ZRX, zrx.address),
  ]);

  const amount = web3.utils.toWei("1000");

  const seedTokenBalanceDai = async (token, trader) => {
    await token.faucet(trader, amount);
    await token.approve(dex.address, amount, { from: trader });

    const ticker = await dai.name();
    console.log('DAI', trader);
    web3.utils.fromAscii('DAI')
    await dex.deposit(web3.utils.toWei("1000"), web3.utils.fromAscii('DAI'), {
      from: trader,
    });
  };
  
  const seedTokenBalanceBat = async (token, trader) => {
    await token.faucet(trader, amount);
    await token.approve(dex.address, amount, { from: trader });

    const ticker = await bat.name();
    console.log('BAT', trader);
    web3.utils.fromAscii('BAT')
    await dex.deposit(web3.utils.toWei("1000"), web3.utils.fromAscii("BAT"), {
      from: trader,
    });
  };

  const seedTokenBalanceRep = async (token, trader) => {
    await token.faucet(trader, amount);
    await token.approve(dex.address, amount, { from: trader });

    const ticker = await rep.name();
    console.log('REP', trader);
    web3.utils.fromAscii('REP')
    await dex.deposit(web3.utils.toWei("1000"), web3.utils.fromAscii("REP"), {
      from: trader,
    });
  };

  const seedTokenBalanceZrx = async (token, trader) => {
    await token.faucet(trader, amount);
    await token.approve(dex.address, amount, { from: trader });

    const ticker = await zrx.name();
    console.log('ZRX', trader);
    web3.utils.fromAscii('ZRX')
    await dex.deposit(web3.utils.toWei("1000"), web3.utils.fromAscii("ZRX"), {
      from: trader,
    });
  };

    await seedTokenBalanceDai(dai, trader1),
      await seedTokenBalanceBat(bat, trader1),
      await seedTokenBalanceRep(rep, trader1),
      await seedTokenBalanceZrx(zrx, trader1);


      // console.log(dai);
      // console.log(bat);
      // console.log(Rep);
      // console.log(zrx);
      // console.log(dex);

  const balances = await Promise.all([
    dex.traderBalances(trader1, DAI),
    dex.traderBalances(trader1, BAT),
    dex.traderBalances(trader1, REP),
    dex.traderBalances(trader1, ZRX),
  ]);

  console.log(balances[0].toString(), "DAI");
  console.log(balances[1].toString(), "BAT");
  console.log(balances[2].toString(), "REP");
  console.log(balances[3].toString(), "ZRX");


  const increaseTime = async (seconds) => {
    await web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_increaseTime",
        params: [seconds],
        id: 0,
      },
      () => {}
    );
    await web3.currentProvider.send(
      {
        jsonrpc: "2.0",
        method: "evm_mine",
        params: [],
        id: 0,
      },
      () => {}
    );
  };

  //create trades
  await dex.createLimitOrder(BAT, 1000, 10, SIDE.BUY, { from: trader1 });
  console.log("-->");
  await dex.createMarketOrder(BAT, 1000, SIDE.SELL, { from: trader1 });
  await increaseTime(1);
  console.log("-->");
  await dex.createLimitOrder(BAT, 10, 11, SIDE.BUY, { from: trader1, gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(BAT, 5, SIDE.SELL, { from: trader1,gas:3000000 });
  console.log("-->");
  await increaseTime(1);
  await dex.createLimitOrder(BAT, 1200, 15, SIDE.BUY, { from: trader1, gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(BAT, 1200, SIDE.SELL, { from: trader1, gas:3000000 });
  console.log("-->");
  await increaseTime(1);
  await dex.createLimitOrder(BAT, 1500, 14, SIDE.BUY, { from: trader1, gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(BAT, 1500, SIDE.SELL, {
    from: trader1,
    gas: 3000000,
  });
  console.log("-->");
  await increaseTime(1);
  console.log("-->");
  await dex.createLimitOrder(BAT, 2000, 12, SIDE.BUY, { from: trader1,gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(BAT, 2000, SIDE.SELL, { from: trader1,gas:3000000 });
  console.log("-->");

  await dex.createLimitOrder(REP, 1000, 2, SIDE.BUY, { from: trader1,gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(REP, 1000, SIDE.SELL, {
    from: trader1,
    gas: 3000000,
  });
  console.log("-->");
  await increaseTime(1);
  await dex.createLimitOrder(REP, 500, 4, SIDE.BUY, { from: trader1,gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(REP, 500, SIDE.SELL, {
    from: trader1,
    gas: 3000000,
  });
  console.log("-->");
  await increaseTime(1);
  await dex.createLimitOrder(REP, 800, 2, SIDE.BUY, { from: trader1,gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(REP, 800, SIDE.SELL, {
    from: trader1,
    gas: 3000000,
  });
  console.log("-->");
  await increaseTime(1);
  await dex.createLimitOrder(REP, 1200, 6, SIDE.BUY, { from: trader1,gas:3000000 });
  console.log("-->");
  await dex.createMarketOrder(REP, 1200, SIDE.SELL, {
    from: trader1,
    gas: 3000000,
  });
console.log("-->");
  // create orders
  await Promise.all([
    dex.createLimitOrder(BAT, 1400, 10, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(BAT, 1200, 11, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(BAT, 1000, 12, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(REP, 3000, 4, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(REP, 2000, 5, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(REP, 500, 6, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(ZRX, 4000, 12, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(ZRX, 3000, 13, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(ZRX, 500, 14, SIDE.BUY, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(BAT, 2000, 16, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(BAT, 3000, 15, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(BAT, 500, 14, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(REP, 4000, 10, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(REP, 2000, 9, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(REP, 800, 8, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),

    dex.createLimitOrder(ZRX, 1500, 23, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(ZRX, 1200, 22, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
    dex.createLimitOrder(ZRX, 900, 21, SIDE.SELL, {
      from: trader1,
      gas: 3000000,
    }),
  ]);
  console.log("--> Done making order");
};
