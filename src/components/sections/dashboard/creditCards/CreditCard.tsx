import { Card, Grid, Palette, Stack, Typography, useTheme } from '@mui/material';
import BankLogoAlt from 'assets/bank-logo-alt.svg';
import BankLogo from 'assets/bank-logo.svg';
import ChipCardBlack from 'assets/chip_black.png';
import ChipCardWhite from 'assets/chip_white.png';
import Image from 'components/base/Image';
// import { currencyFormat } from 'helpers/utils';

export interface CreditCardData {
  balance: string;
  title: string;
  cardHolder: string;
  validThru: string;
  cardNumber: string;
  theme?: 'blue' | 'white' | 'green';
}

interface CreditCardProps {
  theme?: 'blue' | 'white' | 'green';
  cardData: CreditCardData;
}

const getThemeStyles = (theme: 'blue' | 'white' | 'green', palette: Palette) => {
  switch (theme) {
    case 'blue':
      return {
        cardBg: palette.gradients.blueGradient,
        textColor: palette.common.white,
        chipCard: ChipCardWhite,
        bankLogo: BankLogo,
        cardGradient: palette.gradients.whiteGradient,
        borderStyle: 'none',
      };
    case 'white':
      return {
        cardBg: palette.gradients.cardColorThree,
        textColor: palette.common.white,
        labelColor: palette.primary.light,
        chipCard: ChipCardBlack,
        bankLogo: BankLogoAlt,
        cardGradient: palette.gradients.whiteCardGradient,
        borderStyle: 1,
      };
    case 'green':
      return {
        cardBg: palette.gradients.myColor,
        textColor: palette.primary.darker,
        labelColor: palette.primary.light,
        chipCard: ChipCardBlack,
        bankLogo: BankLogoAlt,
        cardGradient: palette.gradients.whiteCardGradient,
        borderStyle: 1,
      };
    default:
      return {
        cardBg: palette.common.white,
        textColor: palette.common.black,
        labelColor: '',
        chipCard: ChipCardWhite,
        bankLogo: BankLogo,
        cardGradient: '',
      };
  }
};

const CreditCard = ({ theme = 'white', cardData }: CreditCardProps) => {
  const { palette } = useTheme();
  const { cardBg, textColor, chipCard, labelColor } = getThemeStyles(theme, palette);
  const userJson = localStorage.getItem('user-info');
  const user = userJson ? JSON.parse(userJson) : null;
  const { balance, title, cardHolder, validThru } = cardData;

  return (
    <Card
      sx={{
        flexGrow: 1,
        overflow: 'hidden',
        background: cardBg,
        color: textColor,
        border: 1,
        borderColor: 'action.focus',
      }}
    >
      <Stack sx={{ gap: 4, px: { xs: 2.5, md: 3 }, pt: 3, pb: { xs: 2, md: 3 } }}>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Typography
              sx={{
                color: labelColor,
                fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                textTransform: 'capitalize',
              }}
            >
              {title}
            </Typography>
            <Typography sx={{ fontSize: { xs: 'body2.fontSize', md: 'h4.fontSize' } }}>
              {user?.branch_currency} {balance}
            </Typography>
          </div>
          <Image src={chipCard} alt="chip-card" sx={{ width: { xs: 30, md: 35 } }} />
        </Stack>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Stack sx={{ gap: 0.5 }}>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                }}
              >
                CARD HOLDER
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 'subtitle1.fontSize', md: 'body1.fontSize' },
                }}
                fontWeight={600}
              >
                {cardHolder}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack sx={{ gap: 0.5 }}>
              <Typography
                sx={{
                  color: labelColor,
                  fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
                }}
              >
                VALID THRU
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 'subtitle1.fontSize', md: 'body1.fontSize' },
                }}
                fontWeight={600}
              >
                {validThru}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default CreditCard;
