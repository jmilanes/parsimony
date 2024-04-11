import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuardDecorator } from "./authentication";
import { AllowedRoles, RolesGuard } from "./authorization";
import { UserRoles } from "@parsimony/types";

export function ProtectRoute(roles: UserRoles[] = []) {
  return applyDecorators(
    AllowedRoles(roles),
    UseGuards(AuthGuardDecorator, RolesGuard)
  );
}
