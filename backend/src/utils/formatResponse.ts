interface SuccessResponse {
  success: true;
  data: any;
  message?: string;
}

interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: number;
    details?: any;
  };
}

export const formatResponse = {
  success(data: any, message?: string): SuccessResponse {
    return {
      success: true,
      data,
      message,
    };
  },

  error(message: string, code: number, details?: any): ErrorResponse {
    return {
      success: false,
      error: {
        message,
        code,
        details,
      },
    };
  },

  pagination(data: any[], total: number, page: number, limit: number) {
    return {
      success: true,
      data,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    };
  },
}; 