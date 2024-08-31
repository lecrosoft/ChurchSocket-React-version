import CardContainer from 'components/common/CardContainter';
import { SwiperSlide } from 'swiper/react';
import Image1 from 'assets/profile/image-1.png';
import Image2 from 'assets/profile/image-2.png';
import Image3 from 'assets/profile/image-3.png';
import Image4 from 'assets/profile/image-4.png';
import Image5 from 'assets/profile/image-5.png';
import Image6 from 'assets/profile/image-6.png';
import Image7 from 'assets/profile/image-7.png';
import 'swiper/css';
import { Box, IconButton, Stack, Tab, Tabs } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ReactSwiper, { SwiperComponentProps } from 'components/base/ReactSwiper';
import SendAmountInput from 'components/sections/dashboard/celebrants/SendAmountInput';
import SlideItem from 'components/sections/dashboard/celebrants/SlideItem';
import { useBreakpoints } from 'providers/useBreakpoints';
import { SyntheticEvent, useEffect, useState } from 'react';

/* ------------------------- Carousel Data ---------------------------- */
interface Item {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  user_type: string; // Changed from 'designation' to 'user_type'
}

interface ApiCelebrant {
  id: number;
  image: string;
  first_name: string;
  last_name: string;
  user_type: string; // Use user_type instead of designation
}

const result: Item[] = [
  { id: 1, image: Image3, first_name: 'Livia', last_name: 'Bator', user_type: 'Today' },
  { id: 2, image: Image2, first_name: 'Randy', last_name: 'Press', user_type: 'Director' },
  { id: 3, image: Image1, first_name: 'Workman', last_name: '', user_type: 'Designer' },
  { id: 4, image: Image4, first_name: 'Kevin', last_name: 'Reed', user_type: 'UX' },
  { id: 5, image: Image5, first_name: 'Sofia', last_name: 'Gill', user_type: 'Director' },
  { id: 6, image: Image6, first_name: 'Jo', last_name: 'Barnes', user_type: 'Analyst' },
  { id: 7, image: Image7, first_name: 'Felix', last_name: 'Vidal', user_type: 'CTO' },
];

console.log(result);
/* -------------------------------------------------------------------------- */

const cardSize = { lg: 70, md: 50, sm: 50 }; // Adjust card size as needed

const BirthdayCelebrant = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { only } = useBreakpoints();
  const isMd = only('md');
  const isSm = only('sm');
  const [itemData, setItemData] = useState<Item[]>([]);
  const [value, setValue] = useState(0);
  const totalSlides = itemData.length;
  const slidesPerView = (isMd && totalSlides >= 5) || (isSm && totalSlides >= 5) ? 5 : 3;
  const churchId = 1; // these values will later be gotten from local storage
  const branchId = 1; // these values will later be gotten from local storage

  const swiperProps: SwiperComponentProps['swiperProps'] = {
    navigation: { nextEl: '.arrow-left', prevEl: '.arrow-right' },
    slidesPerView: slidesPerView,
    spaceBetween: 15,
    slideToClickedSlide: true,
    loop: true,
    centeredSlides: true,
    slideActiveClass: 'swiper-slide-active',
    onRealIndexChange: (swiper) => setCurrentSlide(swiper.realIndex),
    passiveListeners: true,
  };

  const a11yProps = (index: number) => ({
    id: `transaction-tab-${index}`,
    'aria-controls': `transaction-tabpanel-${index}`,
  });

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    filterData(newValue);
  };

  useEffect(() => {
    filterData(value);
  }, [value]);

  const getCelebrants = async (day: string) => {
    try {
      const req = await fetch(
        `http://localhost:8000/api/users/celebrants/${day}/${churchId}/${branchId}`,
      );
      if (!req.ok) {
        throw new Error('Network response was not ok');
      }
      const res = await req.json();

      // Ensure the type of res matches your expected response structure
      const mappedData: Item[] = res.celebrants.map((celebrant: ApiCelebrant) => ({
        id: celebrant.id,
        image: celebrant.image,
        first_name: celebrant.first_name,
        last_name: celebrant.last_name,
        user_type: celebrant.user_type,
      }));

      setItemData(mappedData);
    } catch (error) {
      console.error('Failed to fetch celebrants:', error);
      setItemData([]); // Set to empty array on error
    }
  };

  const filterData = (tabIndex: number) => {
    switch (tabIndex) {
      case 1:
        getCelebrants('ThisWeek');
        break;
      case 2:
        getCelebrants('ThisMonth');
        break;
      default:
        getCelebrants('Today');
        break;
    }
  };

  return (
    <CardContainer title="Birthday Celebrants">
      <Box sx={{ borderBottom: 1, borderColor: 'secondary.lighter', mb: 3.5 }}>
        <Tabs value={value} onChange={handleChange} aria-label="transaction tabs">
          <Tab label="Today Celebrants" {...a11yProps(0)} />
          <Tab label="This Week Celebrants" {...a11yProps(1)} />
          <Tab label="This Month Celebrants" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Stack gap={4} justifyContent="space-between" sx={{ flex: 1, pl: 0.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', mt: 2 }}>
          {/** Slider main container */}
          <Box sx={{ minWidth: 0, overflow: 'hidden', flex: 1 }}>
            <ReactSwiper swiperProps={swiperProps}>
              {itemData.length > 0 ? (
                itemData.map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <SlideItem data={item} cardSize={cardSize} active={currentSlide === index} />
                  </SwiperSlide>
                ))
              ) : (
                <SwiperSlide>No data available</SwiperSlide>
              )}
            </ReactSwiper>
          </Box>
          <IconButton
            className="arrow-left"
            sx={(theme) => ({
              zIndex: 1,
              bgcolor: 'common.white',
              boxShadow: theme.shadows[2],
              mr: 1.15,
              ml: 1,
            })}
          >
            <IconifyIcon icon="iconoir:nav-arrow-right" />
          </IconButton>
        </Stack>
        <SendAmountInput />
      </Stack>
    </CardContainer>
  );
};

export default BirthdayCelebrant;
