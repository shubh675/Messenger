

export const signOut = async (req, res) => {
  try {
    res.clearCookie("access_token").json({
        success: true,
        message: 'logged out successsfully',
    });
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
  }
};
