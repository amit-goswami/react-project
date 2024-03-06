import {
  addDaysToDate,
  generateRandomString,
} from '../components/Profile/PlanAndPricing';

export interface UserDetails {
  email: string;
  phone_number: string;
  name: string;
  is_active: boolean;
  joined_date: string;
}

export interface UserData {
  user_plan_details: {
    plan_name: string;
  };
}

export interface PlanData {
  message: string;
}

export async function FetchUserDetails(
  phoneNumber: string,
  password: string
): Promise<UserDetails> {
  try {
    const formData = new URLSearchParams();
    formData.append('phone_number', phoneNumber);
    formData.append('password', password);

    const response = await fetch(
      'https://api.moneyy.ai/api/me?' + formData.toString(),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return (await response.json()) as UserDetails;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchUserPlanPricing(): Promise<UserData> {
  try {
    const response = await fetch('https://api.moneyy.ai/api/me?', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return (await response.json()) as UserData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function UpgradePlan(isMonthly: boolean): Promise<PlanData> {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const upgradeResponse = await fetch(
      'https://api.moneyy.ai/api/plan/upgrade',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoice_details: {
            issue_date: addDaysToDate(0),
            due_date: isMonthly ? addDaysToDate(30) : addDaysToDate(365),
            reference_number: generateRandomString(),
            currency: 'INR',
          },
          invoice_items: [
            {
              description: isMonthly
                ? 'Premium monthly plan'
                : 'Premium annually Plan',
              quantity: isMonthly ? 1 : 12,
              unit_price: isMonthly ? 999 : 11988,
              total_amount: isMonthly ? 999 : 11988,
            },
          ],
          financial_details: {
            subtotal: isMonthly ? 999 : 11988,
            discount: 0,
            tax: 0,
            around_total: isMonthly ? 999 : 11988,
          },
          payment_details: {
            status: 'Paid',
            payment_method: 'COD',
          },
          user_plan_details: {
            name: 'Premium',
            start_date: addDaysToDate(0),
            expiry_date: isMonthly ? addDaysToDate(30) : addDaysToDate(365),
          },
        }),
      }
    );

    if (!upgradeResponse.ok) {
      throw new Error('Failed to upgrade plan');
    }

    return (await upgradeResponse.json()) as PlanData;
  } catch (error) {
    console.error('Error occurred in plan API:', error);
    throw error;
  }
}

export async function FetchBrokerDetailsAPI(customerId: string) {
  try {
    const response = await fetch(
      'https://7i268tjsq2.execute-api.ap-south-1.amazonaws.com/dev/get-user-broker-details',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: `${customerId}`,
        }),
      }
    );

    const result = await response.json();
    return result;

    // if (result.response_code === 200 && result.response_data.length > 0) {
    //   return result.response_data[0];
    // } else {
    //   console.log('Failed to fetch broker details.');
    //   return null;
    // }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// formApi.ts

export async function handleBrokerFormSubmit(formData: any) {
  try {
    const response = await fetch(
      'https://7i268tjsq2.execute-api.ap-south-1.amazonaws.com/dev/user-broker-details',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}