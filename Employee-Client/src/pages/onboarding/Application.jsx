import { TextField, Box, Button, Typography, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { stateNames, genders, workAuthTypes } from '../../utils/constants';
import DEFAULT_PIC from '../../assets/default-avatar.jpeg';
import { customFetchForForm } from '../../utils/customFetch';
import { toast } from 'sonner';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Application = ({pending, value}) => {

  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const {user} = useSelector((store)=>store.user)

  const showWorkAuth = watch('showWorkAuth');
  const authType = watch('authType');
  const hasDriverlicense = watch('hasDriverlicense');
  const profilePic = watch('profilePic') ? watch('profilePic')[0] : null;
  const optReceipt = watch('optReceipt') ? watch('optReceipt')[0] : null;
  const driverlicense = watch('driverlicense') ? watch('driverlicense')[0] : null;


  const onSubmit = async (data) => {
    const jsonData = {
      firstName: data.firstName,
      lastName: data.lastName,
      middleName: data.middleName,
      preferredName: data.preferredName,
      gender: data.gender,
      cellPhone: data.cellPhone,
      workPhone: data.workPhone,
      SSN: data.SSN,
      DOB: data.dateOfBirth,
      address: {
        street: data.streetAddress,
        building: data.buildingNumber,
        city: data.city,
        state: data.state,
        zip: data.zipCode,
      },
      immigrationStatus: data.identity || "VISA",
      workAuth: {
        title: data.authType === 'Other' ? data.visaTitle : data.authType,
        startDate: data.startDate,
        endDate: data.endDate,
      },
      driversLicense: {
        number: data.licenseNumber,
        expiration: data.licenseExpirationDate,
      },
      car: {
        make: data.carMake,
        model: data.carModel,
        color: data.carColor,
      },
      reference: {
        firstName: data.referenceFirstName,
        middleName: data.referenceMiddleName,
        lastName: data.referenceLastName,
        relationship: data.referenceRelationship,
        phone: data.referencePhone,
        email: data.referenceEmail,
      },
      emergencyContacts: [
        {
          firstName: data.emergencyContactFirstName,
          middleName: data.emergencyContactMiddleName,
          lastName: data.emergencyContactLastName,
          relationship: data.emergencyContactRelationship,
          phone: data.emergencyContactPhone,
          email: data.emergencyContactEmail,
        },
      ]
    }

    const formData = new FormData();

    if (data.profilePic) formData.append('profilePic', data.profilePic[0]);
    if (data.optReceipt) formData.append('optReceipt', data.optReceipt[0]);
    if (data.driverlicense) formData.append('driverlicense', data.driverlicense[0]);
    formData.append('data',JSON.stringify(jsonData))

    const res = await customFetchForForm.post('/profile/createProfile', formData);
    if ( res.ok ) {
      toast.success('Application submitted.');
    } else {
      toast.error('An error occurred, please try again.');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: 'fit-content',
        maxWidth: '1000px',
        mx: 'auto',
        py: '16px',
      }}>
      <Typography variant='h3' gutterBottom>Onboarding Application</Typography>
      { pending ? 
        <Typography variant='h5' sx={{color: 'red'}}>
          Please wait for the HR to review your application.
        </Typography> 
        : null 
      }
      <form style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: 'fit-content',
        mx: 'auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant='h6' sx={{mt:2}}>Personal Information</Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            required
            sx={{ mr: 2 }}
            {...register('firstName')}
            disabled={pending}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            {...register('lastName')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Middle Name"
            variant="outlined"
            sx={{ mr: 2 }}
            fullWidth
            {...register('middleName')}
            disabled={pending}
          />
          <TextField
            label="Preferred Name"
            variant="outlined"
            fullWidth
            {...register('preferredName')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex' }}>
          <TextField
            select
            label="Gender"
            required
            fullWidth
            sx={{ mr: 2 }}
            {...register('gender')}
            disabled={pending}
          >
            {genders.map((gender) => (
              <MenuItem 
                key={gender.value} 
                value={gender.value}
              >
                {gender.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            required
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            {...register('dateOfBirth')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Cell Phone"
            variant="outlined"
            fullWidth
            required
            sx={{ mr: 2 }}
            {...register('cellPhone')}
            disabled={pending}
          />
          <TextField
            label="Work Phone"
            variant="outlined"
            fullWidth
            {...register('workPhone')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="SSN"
            variant="outlined"
            required
            fullWidth
            sx={{ mr: 2 }}
            {...register('SSN')}
            disabled={pending}
          />
          <TextField
            label="Email"
            disabled
            defaultValue={user?user.email:"xxxxx@gmail.com"}
            fullWidth
            {...register('email')}
          />
        </Box>
        <Typography variant='body2' sx={{my:2}}>
          Profile Picture
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 4}}>
          <img
            src={
              profilePic ?
              URL.createObjectURL(profilePic) : 
              DEFAULT_PIC
            }
            width="80px"
            height="80px"
            style={{ borderRadius: '50%' }}
          />
          <Button
            component="label"
            variant="contained"
            sx={{mt: 2}}
            startIcon={<CloudUploadIcon />}
            role={undefined}
            disabled={pending}
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              {...register('profilePic')}
              disabled={pending}
            />
          </Button>
        </Box>
        <Typography variant='h6' sx={{mt:4}}>Physical Address</Typography>
        <TextField
          label="Street Address"
          variant="outlined"
          required
          sx={{mt: 2}}
          {...register('streetAddress')}
          disabled={pending}
        />
        <TextField
          label="Building / Apartment #"
          variant="outlined"
          sx={{mt: 2}}
          {...register('buildingNumber')}
          disabled={pending}
        />
        <TextField
          label="City"
          variant="outlined"
          required
          sx={{mt: 2}}
          {...register('city')}
          disabled={pending}
        />
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            select
            label="State"
            required
            fullWidth
            sx={{ mr: 2 }}
            {...register('state')}
            disabled={pending}
          >
            {stateNames.map((state) => (
              <MenuItem key={state.value} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Zip Code"
            variant="outlined"
            required
            fullWidth
            {...register('zipCode')}
            disabled={pending}
          />
        </Box>
        <Typography variant='h6' sx={{mt:4}}>
          Work Authorization
        </Typography>
        <Typography variant='body2' sx={{mt:2}}>
          Are you a citizen or permanent resident of the United States? *
        </Typography>
        <TextField
          select
          required
          fullWidth
          defaultValue={true}
          sx={{ width: '80px', mt: 2 }}
          {...register('showWorkAuth')}
          disabled={pending}
        >
          <MenuItem value={false}>Yes</MenuItem>
          <MenuItem value={true}>No</MenuItem>
        </TextField>
        {showWorkAuth ? (
          <>
            <Typography variant='body2' sx={{mt:2}}>
              What is your work authorization?
            </Typography>
            <TextField
              label="Work Authorization"
              select
              required
              fullWidth
              sx={{mt: 2}}
              {...register('authType')}
              disabled={pending}
            >
              {workAuthTypes.map((workAuthType) => (
                <MenuItem key={workAuthType.value} value={workAuthType.value}>
                  {workAuthType.label}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ mt: 2, display: 'flex' }}>
              <TextField
                label="Start Date"
                variant="outlined"
                required
                fullWidth
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ mr: 2 }}
                {...register('startDate')}
                disabled={pending}
              />
              <TextField
                label="End Date"
                variant="outlined"
                required
                fullWidth
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('endDate')}
                disabled={pending}
              />
            </Box>
            {authType === 'F1' && (
              <>
                <Typography variant='body2' sx={{mt:2}}>
                  Please upload your OPT receipt
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'end', gap: 4}}>
                  <Button
                    component="label"
                    variant="contained"
                    sx={{mt: 2, width: 120}}
                    startIcon={<CloudUploadIcon />}
                    role={undefined}
                  >
                    Upload
                    <VisuallyHiddenInput
                      type="file"
                      {...register('optReceipt')}
                    />
                  </Button>
                  {optReceipt && (
                    <a 
                      href={URL.createObjectURL(optReceipt)} 
                      target="_blank"
                    >
                      {optReceipt.name}
                    </a>
                  )}
                </Box>
              </>
            )}
            {authType === 'Other' && (
              <TextField
                label = 'Visa Title'
                fullWidth
                required
                sx={{mt: 2}}
                {...register('visaTitle')}
              />
            )}
          </>
        ) : (
          <TextField
            label="Identity"
            select
            required
            fullWidth
            sx={{ mt: 2}}
            {...register('identity')}
            disabled={pending}
          >
            <MenuItem value="PR">
              Green Card
            </MenuItem>
            <MenuItem value="CITIZEN">
              Citizen
            </MenuItem>
          </TextField>
        )}
        <Typography variant='h6' sx={{mt:4}}>
          Driver&rsquo;s License
        </Typography>
        <Typography variant='body2' sx={{mt:2}}>
          Do you have a driver&rsquo;s license? *
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            select
            required
            fullWidth
            sx={{ width: '80px' }}
            {...register('hasDriverlicense')}
            disabled={pending}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </TextField>
        {hasDriverlicense && (
          <>
            <Box sx={{ mt: 2, display: 'flex'}}>
              <TextField
                label="License Number"
                required
                fullWidth
                sx={{mr: 2}}
                {...register('licenseNumber')}
                disabled={pending}
              />
              <TextField
                label="Expiration Date"
                required
                fullWidth
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('licenseExpirationDate')}
                disabled={pending}
              />
            </Box>
            <Typography variant='body2' sx={{my:2}}>
              Please upload your driver&rsquo;s license
            </Typography>
            <Button
              component="label"
              variant="contained"
              sx={{width: 120}}
              startIcon={<CloudUploadIcon />}
              role={undefined}
              disabled={pending}
            >
              Upload
              <VisuallyHiddenInput
                type="file"
                {...register('driverlicense')}
                disabled={pending}
              />
            </Button>
            {driverlicense && (
              <a 
                href={URL.createObjectURL(driverlicense)} 
                target="_blank"
                style={{ marginLeft: 24}}
                disabled={pending}
              >
                {driverlicense.name}
              </a>
            )}
            <Typography variant='h6' sx={{mt:4}}>
              Car Information (if applicable)
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', mt: 2}}>
              <TextField
                label="Make"
                variant="outlined"
                {...register('carMake')}
                disabled={pending}
              />
              <TextField
                label="Model"
                variant="outlined"
                sx={{mt: 2}}
                {...register('carModel')}
                disabled={pending}
              />
              <TextField
                label="Color"
                variant="outlined"
                sx={{mt: 2}}
                {...register('carColor')}
                disabled={pending}
              />
            </Box>
            
          </>
        )}
        
        </Box>
        <Typography variant='h6' sx={{mt:4}}>
          Reference
        </Typography>
        <Typography variant='body2' sx={{mt:2, alignSelf: 'start'}}>
          Who reffered you to this company?
        </Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            fullWidth
            sx={{mr: 2}}
            {...register('referenceFirstName')}
            disabled={pending}
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            sx={{mr: 2}}
            {...register('referenceMiddleName')}
            disabled={pending}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            fullWidth
            {...register('referenceLastName')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            sx={{mr: 2}}
            {...register('referencePhone')}
            disabled={pending}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            {...register('referenceEmail')}
            disabled={pending}
          />
        </Box>
        <TextField
          label="Relationship"
          variant="outlined"
          fullWidth
          required
          sx={{mt: 2}}
          {...register('referenceRelationship')}
          disabled={pending}
        />
        <Typography variant='h6' sx={{mt:4, alignSelf: 'start'}}>
          Emergency Contacts
        </Typography>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="First Name"
            variant="outlined"
            required
            fullWidth
            sx={{mr: 2}}
            {...register('emergencyContactFirstName')}
            disabled={pending}
          />
          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            sx={{mr: 2}}
            {...register('emergencyContactMiddleName')}
            disabled={pending}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            required
            fullWidth
            {...register('emergencyContactLastName')}
            disabled={pending}
          />
        </Box>
        <Box sx={{ mt: 2, display: 'flex'}}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            sx={{mr: 2}}
            {...register('emergencyContactPhone')}
            disabled={pending}
          />
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            {...register('emergencyContactEmail')}
            disabled={pending}
          />
        </Box>
        <TextField
          label="Relationship"
          variant="outlined"
          fullWidth
          required
          sx={{mt: 2}}
          {...register('emergencyContactRelationship')}
          disabled={pending}
        />
        { (optReceipt || driverlicense) && (
          <>
            <Typography variant='h6' sx={{mt:4, alignSelf: 'start'}}>
              Uploaded Files
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column'}}>
              {optReceipt && (
                <a 
                  href={URL.createObjectURL(optReceipt)} 
                  target="_blank"
                >
                  {optReceipt.name}
                </a>
              )}
              {driverlicense && (
                <a 
                  href={URL.createObjectURL(driverlicense)} 
                  target="_blank"
                  style={{ marginTop: 24}}
                >
                  {driverlicense.name}
                </a>
              )}
            </Box>
          </>
        )}
        { !pending &&
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{my: 8}}
            type="submit"
          >
            Submit
          </Button>
        }
      </form>
    </Box>
  )
}

export default Application;
