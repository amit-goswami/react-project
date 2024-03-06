import  ProfileimgJpeg  from   '../../assets/images/profileimg.jpeg'
import { ReactComponent as BeginnerSVG } from '../../assets/images/beginner-sm.svg';
import { ReactComponent as Level2SVG } from '../../assets/images/level2.svg';
import { ReactComponent as Level1SVG } from '../../assets/images/level1.svg';
import { ReactComponent as ProSVG } from '../../assets/images/pro-sm.svg';
import { ReactComponent as HighSvg } from '../../assets/images/high.svg';
import { ReactComponent as LowSvg } from '../../assets/images/low.svg';
import { ReactComponent as MediumSvg } from '../../assets/images/medium.svg';

const LeaderboardData =
    [
        {
            "id": 1,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Beginner",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": -30,
            "market_news_engagement": "High",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <BeginnerSVG />,
            "icon1":<HighSvg/>
        },
        {
            "id": 2,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "10",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>

        },
        {
            "id": 3,
            "image":ProfileimgJpeg,
            "profilepic": "./images/profilePic.jpg",
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": "-30",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>
        },
        {
            "id": 4,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 1",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Medium",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level1SVG />,
            "icon1":<MediumSvg/>
        },
        {
            "id": 5,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "8",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>
        },
        {
            "id": 6,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Beginner",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>
        },
        {
            "id": 7,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Pro",
            "backtest": "20",
            "strategy": "12345",
            "strategy1": 30,
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <ProSVG />,
            "icon1":<LowSvg/>
        },
        {
            "id": 8,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>
        },
        {
            "id": 9,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "6",
            "strategy": "12345",
            "strategy1": "+30",
            "market_news_engagement": "Medium",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<MediumSvg/>
        },
        {
            "id": 10,
            "image":ProfileimgJpeg,
            "name": "Sejal Soni",
            "level": "Level 2",
            "backtest": "2",
            "strategy": "12345",
            "strategy1": "-50",
            "market_news_engagement": "Low",
            "color-red": " #F82929",
            "color-green": " #2ACD1C",
            "color-yellow": "#E7AF1D",
            "icon": <Level2SVG />,
            "icon1":<LowSvg/>
        }
    ]

export default LeaderboardData