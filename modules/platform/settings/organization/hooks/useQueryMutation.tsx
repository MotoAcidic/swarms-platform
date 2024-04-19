import { trpc } from '@/shared/utils/trpc/trpc';

interface UseQueriesprops {
  currentOrgId?: string;
  userOrgId?: string;
}

export function useQueryMutaion({ currentOrgId, userOrgId }: UseQueriesprops) {
  // queries
  const userOrganizationsQuery =
    trpc.organization.getUserOrganizations.useQuery();
  const userOrganizationQuery =
    trpc.organization.getUserPersonalOrganization.useQuery();
  const organizationMembersQuery = trpc.organization.members.useQuery({
    id: currentOrgId ?? ''
  });
  const pendingInvitesQuery = trpc.organization.pendingInvites.useQuery({
    organization_id: userOrgId ?? ''
  });

  // mutations
  const createOrgMutation = trpc.organization.createOrganization.useMutation();
  const updateOrgNameMutation =
    trpc.organization.updateOrganizationName.useMutation();
  const inviteEmailMutation =
    trpc.organization.inviteMemberByEmail.useMutation();
  const changeRoleMutation = trpc.organization.changeMemberRole.useMutation();
  const leaveOrganizationMutation =
    trpc.organization.leaveOrganization.useMutation();
  const deleteMemberMutation = trpc.organization.deleteMember.useMutation();

  const query = {
    organization: userOrganizationQuery,
    organizations: userOrganizationsQuery,
    members: organizationMembersQuery,
    invites: pendingInvitesQuery
  };

  const mutation = {
    create: createOrgMutation,
    update: updateOrgNameMutation,
    invite: inviteEmailMutation,
    changeRole: changeRoleMutation,
    leave: leaveOrganizationMutation,
    delete: deleteMemberMutation
  };

  return { query, mutation };
}
