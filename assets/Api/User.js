export const CreateUser = async (data) => {
    return await fetch("/api/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/ld+json",
        },
        body: JSON.stringify(data),
    });
}

export const UserExist = async (email) => {
    return await fetch(`/api/users/exist/${email}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/ld+json",
    },
    });
}