import Profile from './Profile'

export default class ProfileList {
    profileList: Array<Profile>
    largestId: number

    constructor(profileList: Array<Profile>) {
        // Read JSON to construct ProfileList
        this.profileList = profileList;
        this.largestId = 0;
        this.profileList.forEach(profile => {
            if (profile.id > this.largestId) {
                this.largestId = profile.id
            }
        })
    }

    getProfile(id: number) {
        return this.profileList.find(data => data.id == id);
    }

    createProfile(name: string) {
        this.profileList.push(new Profile(this.largestId + 1, name, 0, 0, []))
        this.largestId += 1;
    }
}