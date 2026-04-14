import { useMemo, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const schema = z.object({
  fullName: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().min(1, 'Email is required').email('Enter a valid email'),
  phone: z
    .string()
    .trim()
    .min(1, 'Phone Number is required')
    .regex(/^[+\d][\d\s().-]{6,}$/i, 'Enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type FormValues = z.infer<typeof schema>

export function FormPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const defaultValues = useMemo<FormValues>(
    () => ({ fullName: '', email: '', phone: '', password: '' }),
    [],
  )

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues,
  })

  const onSubmit = handleSubmit(async (values) => {
    setSuccessMessage(null)
    await new Promise((r) => setTimeout(r, 300))
    setSuccessMessage(`Success! Saved details for ${values.fullName}.`)
    reset(defaultValues)
  })

  return (
    <Box sx={{ display: 'grid', placeItems: 'start center' }}>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          maxWidth: 560,
          borderColor: 'rgba(15,61,102,0.22)',
          boxShadow: '0 8px 22px rgba(15, 23, 42, 0.05)',
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 750 }}>
                Vehicle Owner Registration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enter owner details for registry verification. All fields are mandatory.
              </Typography>
            </Box>

            {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

            <Stack component="form" spacing={2} onSubmit={onSubmit} noValidate>
              <TextField
                label="Owner Full Name"
                {...register('fullName')}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName?.message}
                autoComplete="name"
                fullWidth
              />

              <TextField
                label="Email"
                type="email"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                autoComplete="email"
                fullWidth
              />

              <TextField
                label="Phone Number"
                {...register('phone')}
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
                autoComplete="tel"
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                {...register('password')}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                autoComplete="new-password"
                fullWidth
              />

              <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

