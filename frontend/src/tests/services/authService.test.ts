import { authService } from '../../services/authService';
import { api } from '../../services/api';

jest.mock('../../services/api');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('successfully logs in user', async () => {
    const mockResponse = {
      data: {
        token: 'test-token',
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
      },
    };

    (api.post as jest.Mock).mockResolvedValueOnce(mockResponse);

    const credentials = { email: 'test@example.com', password: 'password123' };
    const result = await authService.login(credentials);

    expect(result).toEqual(mockResponse.data);
    expect(api.post).toHaveBeenCalledWith('/auth/login', credentials);
  });

  it('handles login error', async () => {
    const errorMessage = 'Invalid credentials';
    (api.post as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const credentials = { email: 'test@example.com', password: 'wrong' };
    
    await expect(authService.login(credentials)).rejects.toThrow(errorMessage);
  });
}); 