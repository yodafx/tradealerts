import MetaApi from 'metaapi.cloud-sdk';

const API_KEY = import.meta.env.VITE_METAAPI_TOKEN || '';

if (!API_KEY) {
  console.error('MetaApi token is not set. Please check your .env file.');
}

let api: MetaApi;

try {
  api = new MetaApi(API_KEY);
} catch (error) {
  console.error('Error initializing MetaApi:', error);
}

export const checkApiAvailability = async () => {
  if (!api) {
    return {
      available: false,
      message: 'MetaApi SDK failed to initialize. Please check your API key.',
      error: 'SDK Initialization Error',
      types: 0
    };
  }

  try {
    const accountTypes = await api.metatraderAccountGenerator.getAccountTypes();
    console.log('MetaApi account types:', accountTypes);
    return { 
      available: true, 
      message: 'MetaApi is available',
      types: accountTypes.length
    };
  } catch (error) {
    console.error('MetaApi availability check error:', error);
    let errorMessage = 'An unexpected error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    return { 
      available: false, 
      message: 'MetaApi is not available. Please check your API key and network connection.',
      error: errorMessage,
      types: 0