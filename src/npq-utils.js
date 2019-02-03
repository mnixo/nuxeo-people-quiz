export class NpqUtils {

  static getUsableMembers(members, useMembersWithoutCustomImage, useMembersWithoutProfilePhoto) {
    // create a copy of the original members array
    let usableMembers = members.slice(0);
    // filter out members without custom images (if need be)
    if (!useMembersWithoutCustomImage) {
      usableMembers = usableMembers.filter(member => member.isCustomImage);
    }
    // filter out members without profile photos (if need be)
    if (!useMembersWithoutProfilePhoto) {
      usableMembers = usableMembers.filter(member => member.isProfilePhoto);
    }
    return usableMembers;
  }

  /* global gtag */
  static sendEvent(action, details) {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, details);
    }
  };

}
