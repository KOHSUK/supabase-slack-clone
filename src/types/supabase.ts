export type AppRole = 'admin' | 'moderator';
export type AppPermission = 'channels.delete' | 'messages.delete';
export type UserStatus = 'ONLINE' | 'OFFLINE';

export interface definitions {
  /** Topics and groups. */
  channels: {
    id: number;
    inserted_at: Date;
    slug: string;
    created_by: string;
  };

  /** Individual messages sent by each user. */
  messages: {
    id: number;
    inserted_at: Date;
    message?: string;
    user_id: string;
    channel_id: string;
  };

  /** Application permissions for each role. */
  role_permissions: {
    id: number;
    role: AppRole;
    permission: AppPermission;
  };

  /** Application roles for each user. */
  user_roles: {
    id: number;
    user_id: string;
    role: AppRole;
  };

  /** Profile data for each user. */
  users: {
    id: number;
    username?: string;
    status?: UserStatus;
  };
}
