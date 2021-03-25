export const types = {
    // Por convención ponemos entre llave recta el reducer al cual pertenece nuestro action

    login: "[Auth] Login",
    logout: "[Auth] Logout",

    uiSetError: "[UI] Set Error",
    uiRemoveError: "[UI] Remove Error",

    uiStartLoading: "[UI] Start loading",
    uiFinishLoading: "[UI] Finish loading",

    notesAddEntry: "[Notes] New entry",
    notesActive: "[Notes] Set active entry",
    notesLoad: "[Notes] Load entry",
    notesUpdated: "[Notes] Update entry",
    notesFileUrl: "[Notes] Update image url",
    notesDelete: "[Notes] Delete entry",
    notesLogoutCleaning: "[Notes] Logout cleaning"
};
