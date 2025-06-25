## Usage

```bash
<ConfirmationModal
          open={isPasswordUpdateModalOpen}
          onClose={() => setIsPasswordUpdateModalOpen(false)}
          onConfirm={confirmUserDelete}
          title="Delete User"
          message={`Are you sure you want to delete the user "${userToDelete?.firstName} ${userToDelete?.lastName}"? This action cannot be undone.`}
          confirmText="Update"
          cancelText="Cancel"
        />
```
