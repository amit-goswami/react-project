export const Samples = {
  loginFailed: {
    detail: "Given token not valid for any token type",
    code: "token_not_valid",
    messages: [
      {
        token_class: "AccessToken",
        token_type: "access",
        message: "Token is invalid or expired",
      },
    ],
  },
  successResponse: {
    mockTestAPIRequest: {
      fromDate: "2023-05-01",
      toDate: "2023-06-02",
      entryTime: "09:15",
      exitTime: "15:15",
      strategies: [
        {
          sequence: 1,
          slPerct: 23,
          tpPerct: 42,
          instrumentName: "NIFTYBANK",
          optionType: "CE",
          actionType: "Sell",
          lots: 1,
          atmDiff: 0,
        },
        {
          sequence: 2,
          slPerct: 23,
          tpPerct: 42,
          instrumentName: "NIFTYBANK",
          optionType: "PE",
          actionType: "Sell",
          lots: 1,
          atmDiff: 0,
        },
        {
          sequence: 3,
          slPerct: 23,
          tpPerct: 52,
          instrumentName: "NIFTYBANK",
          optionType: "CE",
          actionType: "Sell",
          lots: 1,
          atmDiff: 0,
        },
      ],
    },
    dailyBackTestResults: {
      "2023-05-02": {
        pnL: -3754,
        dateStr: "2023-05-02",
        strikePrice: 43400,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY04MAY23",
        atm: 43395.05,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-02T09:15:00.003Z",
            endValue: 295.5,
            startTime: "2023-05-02T09:15:00.001Z",
            startValue: 210,
            legPnL: -2126.75,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-02T09:15:00.006Z",
            endValue: 176.65,
            startTime: "2023-05-02T09:15:00.001Z",
            startValue: 143.05,
            legPnL: -835.75,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-02T09:15:00.006Z",
            endValue: 176.65,
            startTime: "2023-05-02T09:15:00.001Z",
            startValue: 143.05,
            legPnL: -835.75,
          },
        ],
      },
      "2023-05-03": {
        pnL: -3372.04,
        dateStr: "2023-05-03",
        strikePrice: 43200,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY04MAY23",
        atm: 43154.85,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-03T14:33:32.002Z",
            endValue: 240,
            startTime: "2023-05-03T09:15:00.001Z",
            startValue: 195,
            legPnL: -1119.5,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-03T14:33:32.002Z",
            endValue: 240,
            startTime: "2023-05-03T09:15:00.001Z",
            startValue: 195,
            legPnL: -1119.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-03T09:15:00.003Z",
            endValue: 176.9,
            startTime: "2023-05-03T09:15:00.001Z",
            startValue: 130,
            legPnL: -1166.75,
          },
        ],
      },
      "2023-05-04": {
        pnL: -1167.6,
        dateStr: "2023-05-04",
        strikePrice: 43200,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY04MAY23",
        atm: 43236.1,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-04T12:42:37.001Z",
            endValue: 243.4,
            startTime: "2023-05-04T09:15:00.001Z",
            startValue: 195,
            legPnL: -1204,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-04T12:42:37.001Z",
            endValue: 243.4,
            startTime: "2023-05-04T09:15:00.001Z",
            startValue: 195,
            legPnL: -1204,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-04T09:16:23.002Z",
            endValue: 62.1,
            startTime: "2023-05-04T09:15:00.001Z",
            startValue: 111,
            legPnL: 1216.5,
          },
        ],
      },
      "2023-05-05": {
        pnL: -8978.89,
        dateStr: "2023-05-05",
        strikePrice: 43100,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY11MAY23",
        atm: 43110.65,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-05T13:50:47.001Z",
            endValue: 371.4,
            startTime: "2023-05-05T09:15:00.001Z",
            startValue: 301,
            legPnL: -1751.25,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-05T09:15:02.001Z",
            endValue: 499.95,
            startTime: "2023-05-05T09:15:00.001Z",
            startValue: 353.05,
            legPnL: -3654.2499999999995,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-05T09:15:02.001Z",
            endValue: 499.95,
            startTime: "2023-05-05T09:15:00.001Z",
            startValue: 353.05,
            legPnL: -3654.2499999999995,
          },
        ],
      },
      "2023-05-08": {
        pnL: -213.87,
        dateStr: "2023-05-08",
        strikePrice: 42800,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY11MAY23",
        atm: 42796.85,
        strategyLegs: [
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-08T09:17:08.001Z",
            endValue: 344.6,
            startTime: "2023-05-08T09:15:00.001Z",
            startValue: 280,
            legPnL: -1607,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-08T09:17:08.001Z",
            endValue: 344.6,
            startTime: "2023-05-08T09:15:00.001Z",
            startValue: 280,
            legPnL: -1607,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-08T09:24:31.001Z",
            endValue: 163.65,
            startTime: "2023-05-08T09:15:00.001Z",
            startValue: 283.25,
            legPnL: 2975,
          },
        ],
      },
      "2023-05-09": {
        pnL: -3734.96,
        dateStr: "2023-05-09",
        strikePrice: 43400,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY11MAY23",
        atm: 43438.55,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-09T09:16:09.001Z",
            endValue: 259.05,
            startTime: "2023-05-09T09:15:00.001Z",
            startValue: 210,
            legPnL: -1220,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-09T09:16:09.001Z",
            endValue: 259.05,
            startTime: "2023-05-09T09:15:00.001Z",
            startValue: 210,
            legPnL: -1220,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-09T14:00:00.002Z",
            endValue: 281.6,
            startTime: "2023-05-09T09:15:00.001Z",
            startValue: 228.05,
            legPnL: -1332,
          },
        ],
      },
      "2023-05-10": {
        pnL: 2861.15,
        dateStr: "2023-05-10",
        strikePrice: 43300,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY11MAY23",
        atm: 43275.25,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-10T09:15:00.006Z",
            endValue: 215,
            startTime: "2023-05-10T09:15:00.001Z",
            startValue: 170,
            legPnL: -1119.5,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-10T09:57:34.004Z",
            endValue: 79.4,
            startTime: "2023-05-10T09:15:00.001Z",
            startValue: 169,
            legPnL: 2228.75,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-10T09:37:05.002Z",
            endValue: 98,
            startTime: "2023-05-10T09:15:00.001Z",
            startValue: 169,
            legPnL: 1766.2500000000002,
          },
        ],
      },
      "2023-05-11": {
        pnL: -2439.96,
        dateStr: "2023-05-11",
        strikePrice: 43500,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY11MAY23",
        atm: 43535.1,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-11T09:23:41.002Z",
            endValue: 199,
            startTime: "2023-05-11T09:15:00.001Z",
            startValue: 150,
            legPnL: -1219,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-11T10:01:01.002Z",
            endValue: 129.4,
            startTime: "2023-05-11T09:15:00.001Z",
            startValue: 104.3,
            legPnL: -624.25,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-11T10:01:01.002Z",
            endValue: 129.4,
            startTime: "2023-05-11T09:15:00.001Z",
            startValue: 104.3,
            legPnL: -624.25,
          },
        ],
      },
      "2023-05-12": {
        pnL: -1012.35,
        dateStr: "2023-05-12",
        strikePrice: 43400,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY18MAY23",
        atm: 43447.15,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-12T13:40:44.002Z",
            endValue: 437.6,
            startTime: "2023-05-12T09:15:00.001Z",
            startValue: 355,
            legPnL: -2054.75,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-12T13:50:05.002Z",
            endValue: 171.25,
            startTime: "2023-05-12T09:15:00.001Z",
            startValue: 295.35,
            legPnL: 3087,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-12T13:40:44.002Z",
            endValue: 437.6,
            startTime: "2023-05-12T09:15:00.001Z",
            startValue: 355,
            legPnL: -2054.75,
          },
        ],
      },
      "2023-05-15": {
        pnL: -4.98,
        dateStr: "2023-05-15",
        strikePrice: 43800,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY18MAY23",
        atm: 43821.05,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-15T11:22:10.002Z",
            endValue: 363,
            startTime: "2023-05-15T09:15:00.001Z",
            startValue: 295,
            legPnL: -1691.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-15T11:22:37.002Z",
            endValue: 184.25,
            startTime: "2023-05-15T09:15:00.001Z",
            startValue: 320.05,
            legPnL: 3378,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-15T11:22:10.002Z",
            endValue: 363,
            startTime: "2023-05-15T09:15:00.001Z",
            startValue: 295,
            legPnL: -1691.5,
          },
        ],
      },
      "2023-05-16": {
        pnL: 3638.21,
        dateStr: "2023-05-16",
        strikePrice: 44100,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY18MAY23",
        atm: 44144.15,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-16T15:11:44.002Z",
            endValue: 105.05,
            startTime: "2023-05-16T09:15:00.001Z",
            startValue: 219.5,
            legPnL: 2847,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-16T15:05:20.001Z",
            endValue: 126.1,
            startTime: "2023-05-16T09:15:00.001Z",
            startValue: 219.5,
            legPnL: 2323.25,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-16T09:16:04.002Z",
            endValue: 314.3,
            startTime: "2023-05-16T09:15:00.001Z",
            startValue: 255.05,
            legPnL: -1473.75,
          },
        ],
      },
      "2023-05-17": {
        pnL: 3540.65,
        dateStr: "2023-05-17",
        strikePrice: 43900,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY18MAY23",
        atm: 43948.5,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-17T09:15:08.002Z",
            endValue: 250,
            startTime: "2023-05-17T09:15:00.001Z",
            startValue: 202.1,
            legPnL: -1191.5,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-17T10:49:36.002Z",
            endValue: 114,
            startTime: "2023-05-17T09:15:00.001Z",
            startValue: 200,
            legPnL: 2139.25,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-17T11:48:02.002Z",
            endValue: 95.1,
            startTime: "2023-05-17T09:15:00.001Z",
            startValue: 200,
            legPnL: 2609.5,
          },
        ],
      },
      "2023-05-18": {
        pnL: -1891.7,
        dateStr: "2023-05-18",
        strikePrice: 44000,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY18MAY23",
        atm: 44006.9,
        strategyLegs: [
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-18T09:23:46.002Z",
            endValue: 110,
            startTime: "2023-05-18T09:15:00.001Z",
            startValue: 89,
            legPnL: -522.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-18T09:15:00.003Z",
            endValue: 184.85,
            startTime: "2023-05-18T09:15:00.001Z",
            startValue: 150.05,
            legPnL: -865.7500000000001,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-18T09:23:46.002Z",
            endValue: 110,
            startTime: "2023-05-18T09:15:00.001Z",
            startValue: 89,
            legPnL: -522.5,
          },
        ],
      },
      "2023-05-19": {
        pnL: 270.27,
        dateStr: "2023-05-19",
        strikePrice: 43900,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY25MAY23",
        atm: 43930,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 305.45,
            startTime: "2023-05-19T09:15:00.001Z",
            startValue: 280,
            legPnL: -633,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-19T10:04:28.002Z",
            endValue: 162,
            startTime: "2023-05-19T09:15:00.001Z",
            startValue: 280,
            legPnL: 2935.25,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-19T09:55:42.001Z",
            endValue: 429.3,
            startTime: "2023-05-19T09:15:00.001Z",
            startValue: 348,
            legPnL: -2022.25,
          },
        ],
      },
      "2023-05-22": {
        pnL: 3079.04,
        dateStr: "2023-05-22",
        strikePrice: 43900,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY25MAY23",
        atm: 43935.3,
        strategyLegs: [
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-22T13:34:52.002Z",
            endValue: 166.65,
            startTime: "2023-05-22T09:15:00.001Z",
            startValue: 287.8,
            legPnL: 3013.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-22T09:18:31.001Z",
            endValue: 289.85,
            startTime: "2023-05-22T09:15:00.001Z",
            startValue: 235,
            legPnL: -1364.5,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 228.75,
            startTime: "2023-05-22T09:15:00.001Z",
            startValue: 287.8,
            legPnL: 1468.75,
          },
        ],
      },
      "2023-05-23": {
        pnL: 43.33,
        dateStr: "2023-05-23",
        strikePrice: 44000,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY25MAY23",
        atm: 43978.9,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 173.45,
            startTime: "2023-05-23T09:15:00.001Z",
            startValue: 200,
            legPnL: 660.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-23T09:15:03.002Z",
            endValue: 257.55,
            startTime: "2023-05-23T09:15:00.001Z",
            startValue: 206.2,
            legPnL: -1277.25,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 173.45,
            startTime: "2023-05-23T09:15:00.001Z",
            startValue: 200,
            legPnL: 660.5,
          },
        ],
      },
      "2023-05-24": {
        pnL: -3242.95,
        dateStr: "2023-05-24",
        strikePrice: 43800,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY25MAY23",
        atm: 43751.95,
        strategyLegs: [
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-24T10:45:47.002Z",
            endValue: 255,
            startTime: "2023-05-24T09:15:00.001Z",
            startValue: 206,
            legPnL: -1219,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-24T10:45:47.002Z",
            endValue: 255,
            startTime: "2023-05-24T09:15:00.001Z",
            startValue: 206,
            legPnL: -1219,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-24T09:16:26.002Z",
            endValue: 178.75,
            startTime: "2023-05-24T09:15:00.001Z",
            startValue: 145,
            legPnL: -839.5,
          },
        ],
      },
      "2023-05-25": {
        pnL: 3765.89,
        dateStr: "2023-05-25",
        strikePrice: 43600,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY25MAY23",
        atm: 43630.25,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-25T09:58:09.002Z",
            endValue: 86.45,
            startTime: "2023-05-25T09:15:00.001Z",
            startValue: 182.55,
            legPnL: 2390.5,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-25T09:27:02.001Z",
            endValue: 105.35,
            startTime: "2023-05-25T09:15:00.001Z",
            startValue: 182.55,
            legPnL: 1920.25,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-25T09:16:54.002Z",
            endValue: 105,
            startTime: "2023-05-25T09:15:00.001Z",
            startValue: 85.2,
            legPnL: -492.5,
          },
        ],
      },
      "2023-05-26": {
        pnL: 694,
        dateStr: "2023-05-26",
        strikePrice: 43800,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY01JUN23",
        atm: 43765.35,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-26T13:01:35.001Z",
            endValue: 313.6,
            startTime: "2023-05-26T09:15:00.001Z",
            startValue: 254.55,
            legPnL: -1468.75,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-26T13:01:35.001Z",
            endValue: 313.6,
            startTime: "2023-05-26T09:15:00.001Z",
            startValue: 254.55,
            legPnL: -1468.75,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-26T13:50:02.002Z",
            endValue: 198.75,
            startTime: "2023-05-26T09:15:00.001Z",
            startValue: 344,
            legPnL: 3613.0000000000005,
          },
        ],
      },
      "2023-05-29": {
        pnL: -3906.17,
        dateStr: "2023-05-29",
        strikePrice: 44300,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY01JUN23",
        atm: 44276.8,
        strategyLegs: [
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-29T09:16:30.001Z",
            endValue: 249.2,
            startTime: "2023-05-29T09:15:01.001Z",
            startValue: 202.2,
            legPnL: -1169.25,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-29T09:15:01.003Z",
            endValue: 344.65,
            startTime: "2023-05-29T09:15:01.001Z",
            startValue: 280.05,
            legPnL: -1607,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-29T09:16:30.001Z",
            endValue: 249.2,
            startTime: "2023-05-29T09:15:01.001Z",
            startValue: 202.2,
            legPnL: -1169.25,
          },
        ],
      },
      "2023-05-30": {
        pnL: 2981.23,
        dateStr: "2023-05-30",
        strikePrice: 44300,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY01JUN23",
        atm: 44277.35,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 241.15,
            startTime: "2023-05-30T09:15:00.001Z",
            startValue: 257.5,
            legPnL: 406.75,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-30T14:43:08.002Z",
            endValue: 121.65,
            startTime: "2023-05-30T09:15:00.001Z",
            startValue: 210,
            legPnL: 2197.75,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 241.15,
            startTime: "2023-05-30T09:15:00.001Z",
            startValue: 257.5,
            legPnL: 406.75,
          },
        ],
      },
      "2023-05-31": {
        pnL: 3473.73,
        dateStr: "2023-05-31",
        strikePrice: 44300,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY01JUN23",
        atm: 44318,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-05-31T09:15:00.003Z",
            endValue: 159.85,
            startTime: "2023-05-31T09:15:00.001Z",
            startValue: 126.45,
            legPnL: -830.7499999999999,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-05-31T09:23:03.002Z",
            endValue: 105.9,
            startTime: "2023-05-31T09:15:00.001Z",
            startValue: 183.05,
            legPnL: 1919.0000000000002,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-05-31T09:36:23.001Z",
            endValue: 86.4,
            startTime: "2023-05-31T09:15:00.001Z",
            startValue: 183.05,
            legPnL: 2404.25,
          },
        ],
      },
      "2023-06-01": {
        pnL: 1648.63,
        dateStr: "2023-06-01",
        strikePrice: 44200,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY01JUN23",
        atm: 44172.05,
        strategyLegs: [
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-06-01T09:15:00.003Z",
            endValue: 158.9,
            startTime: "2023-06-01T09:15:00.001Z",
            startValue: 99.4,
            legPnL: -1480,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "2023-06-01T09:15:07.001Z",
            endValue: 73.4,
            startTime: "2023-06-01T09:15:00.001Z",
            startValue: 130.5,
            legPnL: 1420.25,
          },
          {
            isCE: true,
            sequence: 3,
            endTime: "2023-06-01T09:15:58.001Z",
            endValue: 61.8,
            startTime: "2023-06-01T09:15:00.001Z",
            startValue: 130.5,
            legPnL: 1709,
          },
        ],
      },
      "2023-06-02": {
        pnL: 2012.76,
        dateStr: "2023-06-02",
        strikePrice: 44000,
        lotSize: 25,
        tableName: "OPT-BANKNIFTY08JUN23",
        atm: 43997.3,
        strategyLegs: [
          {
            isCE: true,
            sequence: 3,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 277.85,
            startTime: "2023-06-02T09:15:00.001Z",
            startValue: 349.35,
            legPnL: 1778.5,
          },
          {
            isCE: true,
            sequence: 1,
            endTime: "0001-01-01T00:00:00Z",
            endValue: 277.85,
            startTime: "2023-06-02T09:15:00.001Z",
            startValue: 349.35,
            legPnL: 1778.5,
          },
          {
            isCE: false,
            sequence: 2,
            endTime: "2023-06-02T09:58:04.001Z",
            endValue: 317.5,
            startTime: "2023-06-02T09:15:00.001Z",
            startValue: 256.9,
            legPnL: -1507.5,
          },
        ],
      },
    },
    dayBackTestResults: {
      "2018": {
        Friday: 1751,
        Monday: -4438,
        Thursday: 21008,
        Tuesday: -129,
        Wednesday: 10555,
      },
      "2019": {
        Friday: 3324,
        Monday: 29005,
        Thursday: 15074,
        Tuesday: 4257,
        Wednesday: 13751,
      },
      "2020": {
        Friday: 2165,
        Monday: 98175,
        Saturday: -5604,
        Thursday: 65159,
        Tuesday: 38990,
        Wednesday: 33541,
      },
      "2021": {
        Friday: -2839,
        Monday: 56148,
        Thursday: 28443,
        Tuesday: 26892,
        Wednesday: 19940,
      },
      "2022": {
        Friday: 22077,
        Monday: -1111,
        Thursday: 8983,
        Tuesday: 9804,
        Wednesday: 24998,
      },
      "2023": {
        Friday: 18722,
        Monday: 8238,
        Thursday: 1840,
        Tuesday: 4384,
        Wednesday: 6763,
      },
    },
    monthBackTestResults: {
      "2018": {
        April: -822,
        August: 162,
        December: 4811,
        February: 2890,
        January: -16,
        July: -1470,
        June: 131,
        March: 17402,
        May: 1171,
        November: -458,
        October: 9590,
        September: -4644,
      },
      "2019": {
        April: 9021,
        August: 3653,
        December: -3477,
        February: 6151,
        January: 1923,
        July: 806,
        June: -1655,
        March: 11214,
        May: 9459,
        November: 16505,
        October: -3638,
        September: 15449,
      },
      "2020": {
        April: 35205,
        August: 11583,
        December: 20087,
        February: 5689,
        January: -4166,
        July: 27111,
        June: 6929,
        March: 64222,
        May: 15612,
        November: 10951,
        October: 18828,
        September: 20375,
      },
      "2021": {
        April: 23821,
        August: -551,
        December: 26012,
        February: 8135,
        January: 6773,
        July: 20483,
        June: 12506,
        March: -9977,
        May: 23784,
        November: 708,
        October: 5768,
        September: 11122,
      },
      "2022": {
        April: 14736,
        August: 3213,
        December: -8103,
        February: 7015,
        January: 3200,
        July: 9471,
        June: 8626,
        March: 30269,
        May: -4187,
        November: 2527,
        October: 3313,
        September: -5329,
      },
      "2023": {
        April: 4670,
        February: 12477,
        January: 10945,
        March: 565,
        May: 11290,
      },
    },
    resultsSummary: {
      estimatedMargin: 100000,
      overallProfit: 574613,
      avgDayProfit: 439.97932618683,
      maxDayProfit: 48000,
      maxDayLoss: -15452,
      winPerctInDays: 73.88973966309341,
      lossPerctInDays: 26.11026033690659,
      avgMonthlyProfit: 8840.2,
      avgProfitOnWinDays: 1449.9658031088084,
      avgLossOnLossDays: -2418.1935483870966,
      lotSizes: 25,
      maxDrawDown: -30203,
      maxDrawDaysRecoveryPeriod: 20,
      maxDrawDaysRecoveryStart: "2021-03-05",
      maxDrawDaysRecoveryEnd: "2021-04-08",
      avgYearlyProfit: 95768.83333333333,
      maxDrawDownDays: 17,
      maxPeakProfit: 573480,
      maxProfitByMDD: -18.987517796245406,
      sharpeRatio: 0,
      returnToMDDRatio: -19.025030626096747,
      maxWinningStreak: 22,
      maxLosingStreak: 5,
      zeroslTpHitCount: 248,
      oneSLTPHitCount: 1777,
      twoSLTPHitCount: 587,
    },
  },
};
