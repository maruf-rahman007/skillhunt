

export function checkRole(session: any) { 
  if (!session) return "/login"

  const userRole = session.user.role 

  if (userRole === "recruiter") {
    return "/dashboard"
  } else {
    return "/user"
  }
}

