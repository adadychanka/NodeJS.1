const usersService = [
    {id: 1, fullName: 'Ivan Ivanov', age: 17, type: 'student'},
    {id: 2, fullName: 'Aleksey Aleksandrovich', age: 44, type: 'developer'},
    {id: 3, fullName: 'Azamat Karimov', age: 36, type: 'manager'},
    {id: 4, fullName: 'Rustam Abdullayev', age: 32, type: 'tester'},
    {id: 5, fullName: 'Valentina Gromova', age: 39, type: 'manager'},
    {id: 6, fullName: 'Matvey Stepanov', age: 18, type: 'student'},
    {id: 7, fullName: 'Oleg Semyonov', age: 23, type: 'developer'},
    {id: 8, fullName: 'Alena Denisova', age: 19, type: 'trainee'},
    {id: 9, fullName: 'Pavel Petrov', age: 21, type: 'trainee'},
];

function getUsers(query = {}) {
    console.log(query)
    const fullNameSearch = query?.fullNameSearch

    const minAge = (isNaN(query?.minAge) || !query?.minAge)
        ? 0
        : query.minAge

    const maxAge = (isNaN(query?.maxAge) || !query?.maxAge)
        ? 100
        : query.maxAge

    const type = query?.type

    const limit = (isNaN(query?.limit) || !query?.limit)
        ? 100
        : query.limit

    return usersService.filter(user => {
        let isIncludedInFilter = true

        if (fullNameSearch) {
            isIncludedInFilter = isIncludedInFilter && user.fullName.toLowerCase().includes(fullNameSearch.toLowerCase())
        }

        if (minAge) {
            isIncludedInFilter = isIncludedInFilter && user.age >= minAge
        }

        if (maxAge) {
            isIncludedInFilter = isIncludedInFilter && user.age <= maxAge
        }

        if (type) {
            isIncludedInFilter = isIncludedInFilter && user.type === type
        }

        return isIncludedInFilter
    }).slice(0, limit)
}

module.exports = {
    getUsers: getUsers,
}