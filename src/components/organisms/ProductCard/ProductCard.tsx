import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material'
import type { Product } from '../../../services/products'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'transform 140ms ease, box-shadow 140ms ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="180"
          image={product.imageUrl}
          alt={product.name}
          sx={{ objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.00) 40%, rgba(0,0,0,0.35) 100%)',
          }}
        />
        <Chip
          label={`$${product.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          color="primary"
          sx={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            fontWeight: 700,
            bgcolor: 'rgba(255,255,255,0.92)',
            color: 'text.primary',
            border: '1px solid rgba(15,23,42,0.08)',
          }}
        />
      </Box>

      <CardContent sx={{ pb: 2.25 }}>
        <Stack spacing={0.75}>
          <Typography variant="subtitle1" sx={{ fontWeight: 750, lineHeight: 1.2 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ID: {product.id}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

