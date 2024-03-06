import React, { useEffect, useState } from 'react';
import { Theme, ThemeTypes } from '../../Utils/Constants';
import { InputAdornment, TextField } from '@mui/material';
import StateInputField from './StateInputField';
import ProfilePic from '../../assets/images/profilePic.jpg';
import { FetchUserDetails } from '../../API/ProfileAPI';
import Loader from '../Dialogs/Loader';
const MyProfile: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [userData, setUserData] = useState<{
    email: string;
    phone_number: string;
    name: string;
    is_active: boolean;
    joined_date: string;
  } | null>(null);

  useEffect(() => {
    // const fetchUserData = async () => {
    //   try {
    //     const formData = new URLSearchParams();
    //     formData.append('phone_number', '9949465818');
    //     formData.append('password', 'Titan#12');

    //     const response = await fetch(
    //       'https://api.moneyy.ai/api/me?' + formData.toString(),
    //       {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    //         },
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error('Failed to fetch user data');
    //     }

    //     const userData = await response.json();
    //     setUserData(userData);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const fetchUserData = async () => {
      try {
        const userData = await FetchUserDetails('9949465818', 'Titan#12');
        console.log(userData);

        setUserData(userData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  function formatDate(dateString: any): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <p style={styles.memberSince}>
        Member Since {formatDate(userData?.joined_date)}
      </p>
      <div style={styles.container}>
        <div style={styles.leftContainer}>
          <img src={ProfilePic} alt='logo' style={styles.profileImageStyle} />
        </div>
        <div style={styles.rightContainer}>
          <p style={styles.title}>General Information</p>
          <TextField
            style={styles.textInput}
            id='name'
            label='Name'
            variant='outlined'
            size='small'
            value={userData?.name || ''}
          />
          <TextField
            style={styles.textInput}
            id='phone'
            label='Phone'
            variant='outlined'
            value={userData?.phone_number || ''}
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>+91</InputAdornment>
              ),
            }}
          />
          <TextField
            style={styles.textInput}
            id='email'
            label='Email'
            variant='outlined'
            size='small'
            value={userData?.email || ''}
          />
          <TextField
            style={styles.textInput}
            id='city'
            label='City'
            variant='outlined'
            size='small'
          />
          <div style={{ ...styles.textInput }}>
            <StateInputField
              selectedState='AP'
              onChange={(key) => {
                console.log('state changed', key);
              }}
            />
          </div>

          <p style={styles.title}>Information for Invoices</p>
          <TextField
            style={styles.textInput}
            id='companyName'
            label='CompanyName'
            variant='outlined'
            size='small'
          />
          <TextField
            style={styles.textInput}
            id='GstNo'
            label='GST No.'
            variant='outlined'
            size='small'
          />
          <TextField
            style={styles.textInput}
            id='city'
            label='City'
            variant='outlined'
            size='small'
          />
          <TextField
            style={styles.textInput}
            id='pincode'
            label='Pincode'
            variant='outlined'
            size='small'
          />
          <div style={{ ...styles.textInput }}>
            <StateInputField
              selectedState='AP'
              onChange={(key) => {
                console.log('state changed', key);
              }}
            />
          </div>

          <button style={styles.button}>Save</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  textInput: {
    width: '40%',
    minWidth: '240px',
    margin: Theme.gapSmall,
  },
  button: {
    ...ThemeTypes.yellowButton,
    backgroundColor: Theme.colors.blueSolid,
    color: Theme.colors.white,
    margin: Theme.gapSmall,
  },
  title: {
    fontSize: Theme.fontSizes.h3,
    color: Theme.colors.black,
    margin: 0,
    padding: Theme.gapSmall,
  },
  leftContainer: {
    width: Theme.profileImageWidth,
    height: Theme.profileImageWidth,
    margin: Theme.gapLarge,
    marginTop: Theme.gapXXLarge,
    marginRight: Theme.gapSmall,
  },
  profileImageStyle: {
    width: '100%',
    height: '100%',
  },
  rightContainer: {
    flex: 1,
  },
  container: {
    display: 'flex' as const,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
  },
  memberSince: {
    fontSize: Theme.fontSizes.h4,
    color: Theme.colors.black70,
    padding: Theme.gapTiny,
    margin: 0,
    borderBottom: `1px solid ${Theme.colors.black70}`,
  },
};

export default MyProfile;
